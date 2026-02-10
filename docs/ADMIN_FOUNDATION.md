# Admin Panel Foundation – Step-by-Step Logic

## 1. Why admin seeding is necessary

- **Registration does not create admins.** Your `/api/register` endpoint only inserts `first_name`, `last_name`, `email`, etc., and relies on the database default for `role` (e.g. `'user'`). There is no way for a normal user to become an admin through the UI.
- **First admin must exist before any login.** Someone needs to be able to log in with admin rights from day one. Seeding that account via SQL (or a one-off script) is the standard way to bootstrap the first admin.
- **Security.** By creating the admin directly in the database (or via a script that never exposes an “admin signup” form), you avoid ever offering a public “register as admin” path. Only people with DB or script access can create the initial admin.

So: seeding is necessary to get a permanent admin account that bypasses public registration and keeps the “who is admin” decision under your control.

---

## 2. How role-based access control works here

- **Backend:** Admin routes (e.g. `/api/admin/dashboard`, `/api/admin/users`) read the caller’s identity. In this foundation we use a simple header (`x-user-role`) that the frontend sends after login. If `x-user-role !== 'admin'`, the API returns **403 Forbidden**. Only when the role is `admin` do they get the welcome message or user list.
- **Frontend:** The Admin page reads the stored user (e.g. from `localStorage`) and checks `user.role === 'admin'`. If not admin, it shows “Access denied” and does not call admin APIs (or ignores their 403). The “Admin” link in the header is only shown when the stored user has `role === 'admin'`.

So: **role-based access control** means “backend and frontend both enforce: only `admin` can see/admin content.” Backend is the real authority; frontend checks improve UX and avoid unnecessary requests.

---

## 3. How this prepares the project for a future login system

- **Same role, better auth later.** You can later replace the `x-user-role` header with a signed token (e.g. JWT) or session ID. The server would then load the user (and `role`) from the session or token and still do the same check: `role === 'admin'` → allow, else 403.
- **Central place for “who is logged in”.** Right now the “logged-in user” is stored in `localStorage` and sent as a header. A future step is an auth context (or similar) that holds the same user/role and refreshes when the user logs in/out, so the header (or token) and UI stay in sync.
- **Admin seed stays valid.** However you evolve login (sessions, JWTs, etc.), the seeded admin account remains: same `role = 'admin'` and password hash. You only change *how* the backend verifies the request (e.g. from header to token), not the fact that this user is an admin.

So: this setup gives you a clear, role-based pattern that you can keep while upgrading to a full login system (sessions/JWT, auth context, protected routes) later.
