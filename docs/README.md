# React Mastery Course - Setup Guide

## 🚀 Complete Full-Stack React Learning Platform

A production-ready React learning platform with MySQL backend, user authentication, and progress tracking.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MySQL** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/)
3. **npm** (comes with Node.js)

---

## 🛠️ Installation Steps

### 1. Install Backend Dependencies

```bash
cd "d:/Frontend Codebase/learn"
npm install
```

This will install:
- `express` - Web framework
- `mysql2` - MySQL client
- `bcrypt` - Password hashing
- `cors` - Cross-origin resource sharing
- `body-parser` - Request body parsing

### 2. Setup MySQL Database

**Option A: Using MySQL Command Line**

```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE react_course;

-- Exit MySQL
exit;
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Run: `CREATE DATABASE react_course;`

### 3. Configure Database Connection

Edit `server.js` (line 15-20) with your MySQL credentials:

```javascript
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_MYSQL_PASSWORD', // Change this!
    database: 'react_course',
    // ...
});
```

---

## 🎯 Running the Application

### Step 1: Start the Backend Server

```bash
# In terminal 1
cd "d:/Frontend Codebase/learn"
node server.js
```

You should see:
```
🚀 Server running on http://localhost:3001
✅ Database tables initialized successfully
```

### Step 2: Start the Frontend Server

```bash
# In terminal 2 (new terminal)
cd "d:/Frontend Codebase/learn"
npx serve -l 3000
```

### Step 3: Open the Application

Navigate to: **http://localhost:3000/index.html**

---

## 📊 Database Schema

The application automatically creates these tables:

### `users` Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | User ID |
| name | VARCHAR(255) | User's full name |
| email | VARCHAR(255) | Email (unique) |
| password | VARCHAR(255) | Hashed password |
| created_at | TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | Last update time |

### `user_progress` Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Progress ID |
| user_id | INT (FK) | References users(id) |
| completed_lessons | TEXT | JSON array of completed lesson IDs |
| bookmarks | TEXT | JSON array of bookmarked lesson IDs |
| progress_percentage | INT | Overall progress (0-100) |
| updated_at | TIMESTAMP | Last update time |

---

## 🔐 API Endpoints

### Authentication

**POST** `/api/auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**POST** `/api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Progress Tracking

**POST** `/api/progress/update`
```json
{
  "userId": 1,
  "completedLessons": [1, 2, 3],
  "bookmarks": [5, 10],
  "progressPercentage": 15
}
```

**GET** `/api/progress/:userId`

---

## ✨ Features

### Frontend
- ✅ 22 Comprehensive React Lessons
- ✅ Interactive Code Playground
- ✅ Hands-on Exercises with Validation
- ✅ Live Code Demos
- ✅ Quiz System
- ✅ Dark/Light Theme
- ✅ Search & Filter Lessons
- ✅ Bookmark System
- ✅ Progress Tracking
- ✅ Responsive Design

### Backend
- ✅ User Authentication (Register/Login)
- ✅ Password Hashing (bcrypt)
- ✅ MySQL Database Integration
- ✅ Progress Persistence
- ✅ RESTful API
- ✅ CORS Enabled
- ✅ Error Handling

---

## 🧪 Testing the Application

### 1. Create an Account
- Go to http://localhost:3000/index.html
- Click "Sign Up"
- Enter name, email, password
- Click "Create Account"

### 2. Login
- Enter your email and password
- Click "Sign In"

### 3. Use the Course
- Complete lessons
- Mark lessons as complete
- Bookmark important lessons
- Try the code playground
- Complete exercises

### 4. Logout
- Click the "Logout" button in the header
- Or logout from the dashboard

### 5. Login Again
- Your progress will be restored from the database!

---

## 🐛 Troubleshooting

### Backend won't start
- **Error: "Cannot find module"**
  - Run: `npm install`
  
- **Error: "Access denied for user"**
  - Check MySQL credentials in `server.js`
  - Ensure MySQL is running

- **Error: "Database does not exist"**
  - Create database: `CREATE DATABASE react_course;`

### Frontend issues
- **Blank page**
  - Check browser console for errors
  - Ensure backend is running on port 3001
  
- **Login fails**
  - Check if backend server is running
  - Check browser console for network errors

### Database issues
- **Tables not created**
  - Check MySQL connection
  - Restart backend server

---

## 📁 Project Structure

```
d:/Frontend Codebase/learn/
├── index.html              # Main HTML file
├── app.js                  # Main React application
├── auth.js                 # Authentication components
├── lessons-data.js         # Course content
├── playground.js           # Code playground component
├── styles.css              # All styles
├── server.js               # Backend API server
├── package.json            # Backend dependencies
└── README.md               # This file
```

---

## 🚀 Deployment (Optional)

### Backend Deployment
- Deploy to **Heroku**, **Railway**, or **DigitalOcean**
- Use **ClearDB** or **JawsDB** for MySQL hosting
- Update `API_URL` in `auth.js`

### Frontend Deployment
- Deploy to **Vercel**, **Netlify**, or **GitHub Pages**
- Update API URL to production backend

---

## 📝 Notes

- **Security**: Passwords are hashed using bcrypt
- **Data**: All progress is stored in MySQL
- **Sessions**: User sessions persist in localStorage
- **Multi-user**: Supports multiple users with separate progress

---

## 🎓 Course Content

- **Fundamentals**: React basics, JSX, Components, State, Props
- **Hooks**: useState, useEffect, useRef, useReducer, useMemo, useCallback
- **Advanced**: Context API, Performance, Error Boundaries
- **Routing**: React Router
- **Data**: API Integration, Data Fetching
- **State Management**: Redux Toolkit
- **TypeScript**: Type-safe React
- **Testing**: Jest & React Testing Library
- **Deployment**: Production builds

---

## 💡 Tips

1. Keep both servers running (backend on 3001, frontend on 3000)
2. Your progress auto-saves to MySQL
3. Use the playground to experiment with code
4. Complete exercises to reinforce learning
5. Bookmark lessons for quick reference

---

## 🆘 Support

If you encounter issues:
1. Check that MySQL is running
2. Verify backend server is on port 3001
3. Check browser console for errors
4. Ensure all dependencies are installed

---

**Happy Learning! 🎉**

Master React from Zero to Hero with this comprehensive, production-ready course platform!
