-- =============================================================================
-- Seed: Default admin account
-- =============================================================================
-- Run this against your database (itsecwb_mp_s15b) to create a permanent
-- admin user. This bypasses public registration so no one can "register as
-- admin" through the app.
--
-- Default credentials (change after first login in production):
--   Email:    admin@default.local
--   Password: Admin123!
--
-- The password is stored as an Argon2id hash (same algorithm as your
-- registration endpoint). To generate a new hash for a different password,
-- run in backend folder: bun -e "Bun.password.hash('YourPassword', { algorithm: 'argon2id' }).then(console.log)"
-- =============================================================================

USE itsecwb_mp_s15b;

-- Insert only if no admin exists (safe to run multiple times)
INSERT INTO users (first_name, last_name, email, phone_number, password_hash, role)
SELECT 'Admin', 'System', 'admin@default.local', '09000000000',
       '$argon2id$v=19$m=65536,t=2,p=1$UinHblNYdtF1aoleXn5aeMpbs63AZWT14bYGi32Jhfw$7xsQ5qbbXkWO93v9VTn0xM8JrgJFSCeDFgzyksddYnw',
       'admin'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM users WHERE role = 'admin' LIMIT 1);
