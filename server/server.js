const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root', // Change this to your MySQL password
    database: 'react_course',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Initialize Database Tables
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();

        // Create users table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'student',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Check if role column exists (for existing databases)
        const [columns] = await connection.query("SHOW COLUMNS FROM users LIKE 'role'");
        if (columns.length === 0) {
            await connection.query("ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'student'");
            console.log('✅ Added role column to users table');
        }

        // Create progress table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS user_progress (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                completed_lessons TEXT,
                bookmarks TEXT,
                progress_percentage INT DEFAULT 0,
                last_lesson_id INT DEFAULT 1,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        connection.release();
        console.log('✅ Database tables initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing database:', error);
    }
}

// API Routes

// Register new user
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check if user exists
        const [existingUsers] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if this is the first user (make them admin)
        const [allUsers] = await pool.query('SELECT count(*) as count FROM users');
        const role = allUsers[0].count === 0 ? 'admin' : 'student';

        // Insert user
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );

        const userId = result.insertId;

        // Create initial progress record
        await pool.query(
            'INSERT INTO user_progress (user_id, completed_lessons, bookmarks) VALUES (?, ?, ?)',
            [userId, '[]', '[]']
        );

        // Return user data (without password)
        res.status(201).json({
            success: true,
            user: {
                id: userId,
                name,
                email,
                role,
                progress: 0,
                completedLessons: [],
                bookmarks: []
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = users[0];

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Get user progress
        const [progress] = await pool.query(
            'SELECT * FROM user_progress WHERE user_id = ?',
            [user.id]
        );

        const userProgress = progress[0] || {
            completed_lessons: '[]',
            bookmarks: '[]',
            progress_percentage: 0
        };

        // Return user data (without password)
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || 'student',
                progress: userProgress.progress_percentage,
                completedLessons: JSON.parse(userProgress.completed_lessons),
                bookmarks: JSON.parse(userProgress.bookmarks)
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update user progress
app.post('/api/progress/update', async (req, res) => {
    try {
        const { userId, completedLessons, bookmarks, progressPercentage } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Update progress
        await pool.query(
            `UPDATE user_progress 
             SET completed_lessons = ?, bookmarks = ?, progress_percentage = ?
             WHERE user_id = ?`,
            [
                JSON.stringify(completedLessons || []),
                JSON.stringify(bookmarks || []),
                progressPercentage || 0,
                userId
            ]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update user profile
app.put('/api/users/profile', async (req, res) => {
    try {
        const { userId, name, password } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        if (!name || name.trim().length === 0) {
            return res.status(400).json({ error: 'Name is required' });
        }

        // Update name
        await pool.query(
            'UPDATE users SET name = ? WHERE id = ?',
            [name.trim(), userId]
        );

        // Update password if provided
        if (password && password.length >= 6) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query(
                'UPDATE users SET password = ? WHERE id = ?',
                [hashedPassword, userId]
            );
        }

        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user progress
app.get('/api/progress/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const [progress] = await pool.query(
            'SELECT * FROM user_progress WHERE user_id = ?',
            [userId]
        );

        if (progress.length === 0) {
            return res.status(404).json({ error: 'Progress not found' });
        }

        const userProgress = progress[0];

        res.json({
            success: true,
            progress: {
                completedLessons: JSON.parse(userProgress.completed_lessons),
                bookmarks: JSON.parse(userProgress.bookmarks),
                progressPercentage: userProgress.progress_percentage
            }
        });
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// --- Admin Routes ---

// Get all users (Admin only)
app.get('/api/admin/users', async (req, res) => {
    try {
        // In a real app, verify admin token here

        const [users] = await pool.query(`
            SELECT u.id, u.name, u.email, u.role, u.created_at, 
                   up.progress_percentage, up.completed_lessons 
            FROM users u 
            LEFT JOIN user_progress up ON u.id = up.user_id
            ORDER BY u.created_at DESC
        `);

        res.json({ success: true, users });
    } catch (error) {
        console.error('Admin get users error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete user (Admin only)
app.delete('/api/admin/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Admin delete user error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// --- Profile Routes ---

// Update profile
app.put('/api/users/profile', async (req, res) => {
    try {
        const { userId, name, password } = req.body;

        if (!userId || !name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        if (password && password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query(
                'UPDATE users SET name = ?, password = ? WHERE id = ?',
                [name, hashedPassword, userId]
            );
        } else {
            await pool.query(
                'UPDATE users SET name = ? WHERE id = ?',
                [name, userId]
            );
        }

        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    await initializeDatabase();
});

module.exports = app;
