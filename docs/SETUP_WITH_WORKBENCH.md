# 🚀 Quick Setup Guide - MySQL Workbench

## ✅ You Have MySQL Workbench - Great!

Let's get your React course running in 3 simple steps:

---

## STEP 1: Create Database in MySQL Workbench 🗄️

1. **Open MySQL Workbench**

2. **Connect to your local MySQL server**
   - Click on your local connection (usually "Local instance MySQL80" or similar)
   - Enter your MySQL root password if prompted

3. **Create the database**
   - Click the "SQL" icon (or press Ctrl+T for new query tab)
   - Copy and paste this command:
   ```sql
   CREATE DATABASE react_course;
   ```
   - Click the lightning bolt icon ⚡ to execute
   - You should see: "1 row(s) affected"

4. **Verify it was created**
   - In the left sidebar under "SCHEMAS", click the refresh icon 🔄
   - You should see `react_course` in the list

---

## STEP 2: Update MySQL Password in server.js 🔧

1. **Open `server.js`** (line 18)

2. **Update your MySQL password:**
   ```javascript
   const pool = mysql.createPool({
       host: 'localhost',
       user: 'root',
       password: 'YOUR_MYSQL_ROOT_PASSWORD', // ⚠️ Put your MySQL password here!
       database: 'react_course',
       waitForConnections: true,
       connectionLimit: 10,
       queueLimit: 0
   });
   ```

3. **Save the file** (Ctrl+S)

---

## STEP 3: Run Your Application 🚀

### Option A: Using start.bat (Easiest) ⭐

**Just double-click `start.bat`**

Two windows will open:
- Backend Server (port 3001)
- Frontend Server (port 3000)

Browser opens automatically! 🎉

### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
cd "d:\Frontend Codebase\learn"
node server.js
```

**Wait for these messages:**
```
🚀 Server running on http://localhost:3001
✅ Database tables initialized successfully
```

**Terminal 2 - Frontend:**
```bash
cd "d:\Frontend Codebase\learn"
npx serve -l 3000
```

**Open browser:**
http://localhost:3000/index.html

---

## 🎮 First Time Usage

1. **Create Account**
   - Click "Sign Up"
   - Enter: Name, Email, Password (min 6 chars)
   - Click "Create Account"
   - **You'll be the Admin!** (first user gets admin rights)

2. **Start Learning**
   - Click "Start Course"
   - Complete lessons
   - Try the code playground
   - Your progress auto-saves to MySQL!

3. **Check Database (Optional)**
   - Open MySQL Workbench
   - Run: `SELECT * FROM react_course.users;`
   - You'll see your account!

---

## 🐛 Troubleshooting

### "Access denied for user 'root'"
- ✅ Check password in `server.js` line 18
- ✅ Make sure it matches your MySQL Workbench password
- ✅ Try connecting in MySQL Workbench first to verify password

### "Database does not exist"
- ✅ Open MySQL Workbench
- ✅ Run: `CREATE DATABASE react_course;`
- ✅ Refresh schemas list

### "Port 3001 already in use"
```bash
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F
```

### Backend shows error
- ✅ Check if MySQL service is running (Windows Services)
- ✅ Verify database name is exactly `react_course`
- ✅ Check password is correct

---

## 📊 Database Tables (Auto-Created)

When you start the backend, these tables are created automatically:

### `users` table:
- id, name, email, password (hashed), role, created_at, updated_at

### `user_progress` table:
- id, user_id, completed_lessons, bookmarks, progress_percentage, last_lesson_id, updated_at

**You can view them in MySQL Workbench:**
```sql
USE react_course;
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM user_progress;
```

---

## ✨ Quick Checklist

- [x] MySQL Workbench installed ✅
- [ ] Create database `react_course`
- [ ] Update password in `server.js` line 18
- [ ] Save `server.js`
- [ ] Double-click `start.bat`
- [ ] Create your account
- [ ] Start learning! 🎓

---

## 💡 Pro Tips

- 🔥 **First user = Admin** - You'll get admin dashboard access
- 💾 **Auto-save** - Progress saves to MySQL automatically
- 🔍 **View data** - Use MySQL Workbench to see your progress in real-time
- 🎨 **Dark Mode** - Toggle theme in the app
- 🏆 **Certificate** - Get certificate when you complete all lessons

---

**Ready? Let's go!** 🚀

1. Create database in MySQL Workbench
2. Update password in server.js
3. Run start.bat

**Happy Learning!**
