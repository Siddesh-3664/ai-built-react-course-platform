# 🚀 React Mastery Course

> **A comprehensive, interactive React.js course platform with 22 lessons, progress tracking, and certificate generation.**

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

---

## ✨ Features

- 🎓 **22 Interactive Lessons** - From beginner to advanced
- 💻 **Live Code Playground** - Write and test React code in real-time
- 📊 **Progress Tracking** - MySQL database with persistent storage
- 🏆 **Certificates** - Generate completion certificates
- 👥 **User Management** - Authentication, profiles, and admin panel
- 🎨 **Beautiful UI** - Modern design with dark/light themes
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🔖 **Bookmarks** - Save important lessons
- 💪 **Exercises** - Hands-on practice challenges
- 📝 **Quizzes** - Test your knowledge

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL database**
   ```bash
   # Create database
   mysql -u root -p
   CREATE DATABASE react_course;
   exit;
   
   # Run schema
   mysql -u root -p react_course < server/database/setup-database.sql
   ```

4. **Configure environment**
   ```bash
   # Copy .env.example to .env
   cp .env.example .env
   
   # Edit .env with your MySQL credentials
   ```

5. **Start the application**
   ```bash
   # Windows
   scripts\start.bat
   
   # Or manually:
   # Terminal 1 - Backend
   node server/server.js
   
   # Terminal 2 - Frontend  
   npx serve public -l 3000
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
d:\Frontend Codebase\learn\
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── App.js         # Main application
│   │   ├── Auth.js        # Authentication
│   │   ├── Profile.js     # User profile
│   │   ├── AdminDashboard.js
│   │   ├── Certificate.js
│   │   └── Playground.js
│   ├── data/              # Course content
│   │   └── lessons-data.js
│   ├── styles/            # CSS files
│   │   └── styles.css
│   └── utils/             # Utility functions
│       └── api.js
├── server/                # Backend
│   ├── server.js         # Express API
│   └── database/         # Database files
│       └── setup-database.sql
├── public/               # Static files
│   └── index.html       # Entry point
├── docs/                # Documentation
│   ├── README.md
│   ├── HOW_TO_RUN.md
│   ├── QUICK_START.md
│   ├── PROJECT_REVIEW.md
│   └── SUMMARY.md
├── scripts/             # Utility scripts
│   ├── start.bat       # Quick start
│   └── test-setup.bat  # Setup verification
├── .env.example        # Environment template
├── .gitignore         # Git ignore rules
├── package.json       # Dependencies
└── README.md         # This file
```

---

## 🎯 Usage

### For Students

1. **Sign Up** - Create your account (first user becomes admin)
2. **Learn** - Complete 22 interactive React lessons
3. **Practice** - Use the code playground and exercises
4. **Track Progress** - See your completion percentage
5. **Get Certificate** - Download upon 100% completion

### For Admins

1. **Access Dashboard** - Manage users and monitor progress
2. **View Analytics** - See user statistics
3. **Manage Users** - Add/remove users as needed

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Babel (in-browser JSX)
- Vanilla CSS with modern features

### Backend
- Node.js
- Express.js
- MySQL 8.0
- bcrypt (password hashing)

---

## 📚 Course Content

### Lessons Include:
1. Introduction to React
2. JSX Fundamentals
3. Components & Props
4. State Management
5. Event Handling
6. Conditional Rendering
7. Lists & Keys
8. Forms & Controlled Components
9. Component Lifecycle
10. Hooks (useState, useEffect)
11. Custom Hooks
12. Context API
13. useReducer Hook
14. Performance Optimization
15. React Router
16. API Integration
17. Error Handling
18. Testing Basics
19. TypeScript with React
20. Best Practices
21. Deployment
22. Advanced Patterns

---

## 🔧 Configuration

### Environment Variables (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=react_course
PORT=3001
JWT_SECRET=your-secret-key
```

---

## 📖 Documentation

- **[Quick Start Guide](docs/QUICK_START.md)** - Get started in 5 minutes
- **[How to Run](docs/HOW_TO_RUN.md)** - Detailed setup instructions
- **[Project Review](docs/PROJECT_REVIEW.md)** - Architecture and optimization
- **[Summary](docs/SUMMARY.md)** - Feature overview

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Database Connection Error
- Check if MySQL is running
- Verify credentials in `.env`
- Ensure database `react_course` exists

### Frontend Not Loading
- Check browser console (F12)
- Verify all files are in correct locations
- Clear browser cache

---

## 🚀 Deployment

### Frontend
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**

### Backend
- **Railway** (Recommended)
- **Heroku**
- **DigitalOcean**

### Database
- **PlanetScale** (MySQL)
- **Railway**
- **AWS RDS**

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**React Mastery Course Team**

---

## 🙏 Acknowledgments

- React team for the amazing library
- All contributors and users
- Open source community

---

## 📞 Support

For issues and questions:
- Check [Documentation](docs/)
- Review [Troubleshooting](#-troubleshooting)
- Open an issue on GitHub

---

**⭐ If you find this helpful, please star the repository!**

**Happy Learning! 🚀**
