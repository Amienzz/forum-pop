# Admin Panel – Setup & Usage

## 1. Database: seed the admin account

Run the seed script **once** so an admin user exists (bypasses public registration):

```bash
# From project root, using MySQL CLI:
mysql -u YOUR_MYSQL_USER -p itsecwb_mp_s15b < seed-admin.sql
```

Or open `seed-admin.sql` in MySQL Workbench and execute it against database `itsecwb_mp_s15b`.

**Default admin credentials:**

- **Email:** `admin@xdhobbyshop.local`
- **Password:** `Admin123!`

Change the password after first login in production.

---

## 2. Backend: start the API

From the **backend** folder:

```bash
cd backend
bun install
```

Create a **`.env`** in `backend/` with your MySQL settings:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=itsecwb_mp_s15b
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
PORT=3000
```

Then start the server:

```bash
bun run src/index.ts
```

You should see: `Elysia is running at localhost:3000`. Leave this terminal open.

---

## 3. Frontend: run the app

You can run the app from either location:

**Option A – Project root (recommended):**
```bash
npm install
npm run dev
```

**Option B – Frontend folder:**
```bash
cd frontend
npm install
npm run dev
```

The app will open at **http://localhost:8080** (or the port shown). Both use the same Admin Panel (sidebar with Dashboard and Users).

If your backend is on a different host/port, create a **`.env`** in the project root:

```env
VITE_API_URL=http://localhost:3000/api
```

Restart the dev server after changing `.env`.

---

## 4. Open the Admin Panel

1. In the browser, go to **http://localhost:8080**.
2. Click **Log in** and sign in with:
   - Email: `admin@xdhobbyshop.local`
   - Password: `Admin123!`
3. After login, click **Admin** in the header, or go to **http://localhost:8080/admin**.

You’ll see the **Admin Panel** with a sidebar:

- **Dashboard** – stats (total users, admins, regular users) and recent registrations from MySQL.
- **Users** – full table of all users (avatar, name, email, phone, role, created).
- **Back to site** – return to the main app.

Non-admin users who open `/admin` are redirected to the home page.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Run `seed-admin.sql` on database `itsecwb_mp_s15b` |
| 2 | Start backend from `backend/` with `.env` set (port 3000) |
| 3 | Start frontend from **project root** with `npm run dev` (port 8080) |
| 4 | Log in as admin, then go to **/admin** or click **Admin** in the header |
