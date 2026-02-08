CREATE DATABASE IF NOT EXISTS itsecwb_mp_s15b;
USE itsecwb_mp_s15b;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_photo_path VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed a default admin account
-- Password will need to be manually hashed if inserting directly, 
-- or use the registration endpoint and manually update the role in DB later.