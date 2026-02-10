

import { Elysia, t } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { rateLimit } from 'elysia-rate-limit';
import { SQL } from "bun";

// --- Database Connection ---
const mysql = new SQL({
  adapter: "mysql",
  hostname: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});



// --- Security Helpers ---
// File upload limits and allowed types
const MAX_IMAGE_BYTES = Number(process.env.MAX_IMAGE_BYTES) || 2 * 1024 * 1024; // 2 MB default

// Read only the first bytes of the File to determine type (no full buffering)
async function detectImageType(file: File): Promise<'jpg' | 'png' | null> {
    // Read the first 16 bytes which is enough for common image signatures
    const slice = file.slice(0, 16);
    const buffer = await slice.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

    // JPEG: FF D8 FF
    if (hex.startsWith('FFD8FF')) return 'jpg';
    // PNG: 89 50 4E 47
    if (hex.startsWith('89504E47')) return 'png';

    return null;
}

// Ensure uploads directory exists where possible (guard for Bun API differences)
async function ensureUploadsDir() {
    try {
        // Use a dynamic lookup to avoid TypeScript typing problems if Bun typings don't include mkdir
        const bunAny = (globalThis as any).Bun;
        if (bunAny && typeof bunAny.mkdir === 'function') {
            await bunAny.mkdir('uploads', { recursive: true });
            return;
        }
        // Fallback: try creating via Bun API name if available at runtime
        if (typeof (globalThis as any).mkdir === 'function') {
            await (globalThis as any).mkdir('uploads');
        }
    } catch (e) {
        // non-fatal - directory creation failure is not fatal here
        console.warn('ensureUploadsDir:', e);
    }
}

const app = new Elysia()
    // anti-brute force, idk why its being marked as wrong but it just works trust me
    .use(rateLimit())
    // CORS headers for frontend requests
    .onBeforeHandle(({ set }) => {
        set.headers['Access-Control-Allow-Origin'] = '*';
        set.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        set.headers['Access-Control-Allow-Headers'] = 'Content-Type, x-user-role';
    })
    // Handle OPTIONS requests for CORS preflight
    .options('/*', () => {
        return 'OK';
    })
    // Serve uploaded images statically but carefully
    .use(staticPlugin({
        assets: 'uploads',
        prefix: '/uploads'
    }))
    .group('/api', app => app
        // --- 1. Registration ---
        .post('/register', async ({ body, set }) => {
            const { firstName, lastName, email, phone, password, photo } = body;

            // 4.d File Upload Security: size limit, header-based detection, and safe save
            // Prepare storage path variable before validation
            let photoPath: string | null = null;

            if (photo) {
                // Reject empty or oversized files early
                if (photo.size === 0 || photo.size > MAX_IMAGE_BYTES) {
                    set.status = 400;
                    return { error: `Invalid file size. Max ${MAX_IMAGE_BYTES} bytes.` };
                }

                const detected = await detectImageType(photo);
                if (!detected) {
                    set.status = 400;
                    return { error: 'Invalid file type. Only JPG, PNG, GIF, and WEBP allowed.' };
                }

                // Ensure uploads dir exists (best-effort)
                await ensureUploadsDir();

                // Use a safe random filename and the detected extension (do not use user-provided name)
                const savedName = `${crypto.randomUUID()}.${detected}`;
                const data = await photo.arrayBuffer(); // OK since we've limited size
                try {
                    await Bun.write(`uploads/${savedName}`, data);
                } catch (e) {
                    console.error('Failed to write upload:', e);
                    set.status = 500;
                    return { error: 'Failed to save uploaded file.' };
                }

                photoPath = `/uploads/${savedName}`;
            }

            // Check if user exists
            const rows: any = await mysql `SELECT id FROM users WHERE email = ${email}`;
            if (rows.length > 0) {
                set.status = 409;
                return { error: 'Email already registered.' };
            }

            // 4.b Password Hashing: Bun.password uses Argon2id by default (includes salting)
            const passHash = await Bun.password.hash(password);

            // Handle File Save (photoPath set above after validation)

            // Insert User
            await mysql `INSERT INTO users (first_name, last_name, email, phone_number, password_hash, profile_photo_path)
            VALUES (${firstName}, ${lastName}, ${email}, ${phone}, ${passHash}, ${photoPath})`;


            return { success: true, message: "User registered." };
        }, {
            // 4.c Input Validation
            body: t.Object({
                firstName: t.String(),
                lastName: t.String(),
                email: t.String({ format: 'email' }),
                phone: t.String({ minLength: 11 }), // Basic length check, regex is better
                password: t.String({ minLength: 8 }),
                photo: t.Optional(t.File())
            })
        })

        // --- 2. Login ---
        .post('/login', async ({ body, set, cookie: { session } }) => {
            const rows: any = await mysql `SELECT * FROM users WHERE email = ${body.email}`;
            const user = rows[0];

            if (!user) {
                set.status = 401;
                return { error: 'Invalid credentials' };
            }

            const isMatch = await Bun.password.verify(body.password, user.password_hash);
            if (!isMatch) {
                set.status = 401;
                return { error: 'Invalid credentials' };
            }

            // Simple session management (can use JWT instead)
            // returning user info (exclude password!)
            return {
                id: user.id,
                fname: user.first_name,
                lname: user.last_name,
                email: user.email,
                role: user.role,
                photo: user.profile_photo_path
            };
        }, {
            body: t.Object({
                email: t.String(),
                password: t.String()
            })
        })

        // --- 3. Protected admin dashboard (role-based access) ---
        .get('/admin/dashboard', async ({ headers, set }) => {
            const userRole = headers['x-user-role'];
            if (userRole !== 'admin') {
                set.status = 403;
                return { error: 'Forbidden: Admins only.' };
            }

            const [totalResult] = await mysql `SELECT COUNT(*) AS count FROM users`;
            const [adminResult] = await mysql `SELECT COUNT(*) AS count FROM users WHERE role = 'admin'`;
            const [userResult] = await mysql `SELECT COUNT(*) AS count FROM users WHERE role = 'user'`;
            const recentUsers = await mysql `SELECT id, first_name, last_name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 5`;

            const totalUsers = Number((totalResult as any)?.count ?? 0);
            const adminCount = Number((adminResult as any)?.count ?? 0);
            const userCount = Number((userResult as any)?.count ?? 0);

            return {
                message: 'Welcome to the admin dashboard.',
                role: 'admin',
                stats: {
                    totalUsers,
                    adminCount,
                    userCount,
                },
                recentUsers: recentUsers || [],
            };
        })

        // --- 4. Admin Panel Data ---
        .get('/admin/users', async ({ headers, set }) => {
            const userRole = headers['x-user-role'];
            if (userRole !== 'admin') {
                set.status = 403;
                return { error: "Forbidden: Admins only." };
            }

            const users = await mysql `SELECT id, first_name, last_name, email, phone_number, role, profile_photo_path, created_at FROM users ORDER BY created_at DESC`;
            return users;
        })
    )
    .listen(Number(process.env.PORT) || 3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);