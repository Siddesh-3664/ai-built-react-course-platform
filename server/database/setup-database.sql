-- ========================================
-- React Mastery Course - Database Setup
-- ========================================
-- Run this script in MySQL Workbench to set up your database

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS react_course;

-- Step 2: Use the database
USE react_course;

-- Step 3: Verify database was created
SELECT 'Database react_course created successfully!' AS Status;

-- Step 4: Show all databases (you should see react_course in the list)
SHOW DATABASES;

-- ========================================
-- Note: The tables will be created automatically 
-- when you start the backend server (node server.js)
-- ========================================

-- Optional: View tables after running the backend
-- SHOW TABLES;
-- SELECT * FROM users;
-- SELECT * FROM user_progress;
