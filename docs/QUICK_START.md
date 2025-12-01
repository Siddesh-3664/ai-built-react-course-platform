# 🚀 QUICK START GUIDE - React Mastery Course

## ⚠️ IMPORTANT: MySQL Setup Required First!

### Step 1: Install MySQL (If Not Installed)

**Option A: Download MySQL Installer**
1. Go to: https://dev.mysql.com/downloads/installer/
2. Download "MySQL Installer for Windows"
3. Run the installer
4. Choose "Developer Default" setup
5. Set a root password (remember this!)
6. Complete the installation

**Option B: Use XAMPP (Easier)**
1. Download XAMPP: https://www.apachefriends.org/
2. Install XAMPP
3. Open XAMPP Control Panel
4. Start "MySQL" module
5. Default password is empty (no password)

---

## Step 2: Create Database

### Using MySQL Command Line:
```bash
# Open Command Prompt and run:
mysql -u root -p
# Enter your MySQL password

# Then run:
CREATE DATABASE react_course;
exit;
```

### Using phpMyAdmin (if using XAMPP):
1. Open http://localhost/phpmyadmin
2. Click "New" in the left sidebar
3. Database name: `react_course`
4. Click "Create"

---

## Step 3: Configure Database Connection

**Edit `server.js` file (line 18):**

```javascript
// If you have a password:
password: 'your_mysql_password_here',

// If no password (XAMPP default):
password: '',
```

---

## Step 4: Run the Application

### Option A: Using start.bat (Easiest) ✨
1. **Double-click `start.bat`** in the project folder
2. Two command windows will open (Backend & Frontend)
3. Browser will open automatically
4. Done! 🎉

### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
cd "d:\Frontend Codebase\learn"
node server.js
```
Wait for: `✅ Database tables initialized successfully`

**Terminal 2 - Frontend:**
```bash
cd "d:\Frontend Codebase\learn"
npx serve -l 3000
```

**Browser:**
Open: http://localhost:3000/index.html

---

## 🎯 First Time Usage

1. **Sign Up:**
   - Click "Sign Up" button
   - Enter your name, email, and password (min 6 characters)
   - Click "Create Account"
   - **First user automatically becomes Admin!**

2. **Start Learning:**
   - Click "Start Course"
   - Complete lessons, try exercises
   - Your progress auto-saves to MySQL

3. **Admin Features:**
   - First user gets admin access
   - View all users and their progress
   - Manage users from Admin Dashboard

---

## 🐛 Troubleshooting

### "Cannot connect to MySQL"
- ✅ Ensure MySQL is running
- ✅ Check password in `server.js` line 18
- ✅ Verify database `react_course` exists

### "Port 3001 already in use"
```bash
# Kill the process using port 3001
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F
```

### "Network Error" on login
- ✅ Backend must be running on port 3001
- ✅ Check backend terminal for errors
- ✅ Open browser console (F12) for details

### Backend won't start
```bash
# Reinstall dependencies
npm install
```

---

## 📊 What Gets Saved to Database

✅ User accounts (name, email, hashed password)
✅ Completed lessons
✅ Bookmarks
✅ Progress percentage
✅ Admin/student roles
✅ Profile updates

---

## 🎨 Features Available

### For Students:
- 22 Interactive React lessons
- Code playground with live preview
- Progress tracking
- Bookmarks
- Certificates on completion
- Profile settings
- Dark/Light theme

### For Admins:
- User management dashboard
- View all user progress
- Delete users
- Monitor course completion

---

## 🔐 Security Features

✅ Password hashing with bcrypt
✅ SQL injection protection
✅ CORS enabled
✅ Input validation
✅ Session management

---

## 💡 Pro Tips

1. **Keep both servers running** - Backend (3001) + Frontend (3000)
2. **Use start.bat** - Easiest way to start everything
3. **First user = Admin** - Create your account first!
4. **Progress auto-saves** - No need to manually save
5. **Check browser console** - F12 for debugging

---

## 🎓 Ready to Start?

1. ✅ Install MySQL
2. ✅ Create `react_course` database
3. ✅ Update password in `server.js`
4. ✅ Double-click `start.bat`
5. ✅ Create your account
6. ✅ Start learning React!

---

**Need Help?** Check the browser console (F12) and backend terminal for error messages.

**Happy Learning! 🚀**
