const { useState, useEffect, useContext, createContext, useReducer, useMemo, useCallback, useRef } = React;

// Import lesson data
const lessons = courseLessons;

// Theme Context
const ThemeContext = createContext();

// Progress persistence
const useProgress = () => {
    const [completedLessons, setCompletedLessons] = useState(() => {
        const saved = localStorage.getItem('react-course-progress');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    const [bookmarks, setBookmarks] = useState(() => {
        const saved = localStorage.getItem('react-course-bookmarks');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    useEffect(() => {
        localStorage.setItem('react-course-progress', JSON.stringify([...completedLessons]));
    }, [completedLessons]);

    useEffect(() => {
        localStorage.setItem('react-course-bookmarks', JSON.stringify([...bookmarks]));
    }, [bookmarks]);

    return { completedLessons, setCompletedLessons, bookmarks, setBookmarks };
};

// Demo Components (compact versions)
function SimpleDemo() {
    return <h1 style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2.5rem', margin: 0 }}>Hello, React! 👋</h1>;
}

function StateDemo() {
    const [count, setCount] = useState(0);
    return (
        <div className="demo-content">
            <div className="demo-output" style={{ marginBottom: '1rem' }}>Count: {count}</div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button className="demo-button" onClick={() => setCount(count - 1)}>➖</button>
                <button className="demo-button" onClick={() => setCount(0)}>Reset</button>
                <button className="demo-button" onClick={() => setCount(count + 1)}>➕</button>
            </div>
        </div>
    );
}

function FormDemo() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
    };

    return (
        <div style={{ width: '100%', maxWidth: '350px' }}>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '0.75rem', background: 'rgba(30,30,63,0.8)', border: '1px solid rgba(102,126,234,0.3)', borderRadius: '8px', color: '#e4e4f0', marginBottom: '0.75rem' }} />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ width: '100%', padding: '0.75rem', background: 'rgba(30,30,63,0.8)', border: '1px solid rgba(102,126,234,0.3)', borderRadius: '8px', color: '#e4e4f0', marginBottom: '0.75rem' }} />
                <button type="submit" className="demo-button" style={{ width: '100%' }}>Login</button>
            </form>
            {submitted && <div style={{ marginTop: '1rem', color: '#43e97b', textAlign: 'center' }}>✅ Submitted!</div>}
        </div>
    );
}

function ApiDemo() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setTimeout(() => {
            setData({ name: 'John Doe', role: 'Developer', status: 'Active' });
            setLoading(false);
        }, 1500);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <button className="demo-button" onClick={fetchData} disabled={loading}>
                {loading ? '⏳ Loading...' : '📡 Fetch Data'}
            </button>
            {data && (
                <div className="demo-output" style={{ marginTop: '1rem' }}>
                    <div><strong>{data.name}</strong></div>
                    <div>{data.role}</div>
                    <div style={{ color: '#43e97b' }}>● {data.status}</div>
                </div>
            )}
        </div>
    );
}

// Get demo component for lesson
function getDemoComponent(lessonId) {
    const demos = {
        1: SimpleDemo,
        3: StateDemo,
        8: FormDemo,
        15: ApiDemo
    };
    return demos[lessonId] || SimpleDemo;
}

// Quiz Component
function Quiz({ quiz, onComplete }) {
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);

    const handleAnswer = (index) => {
        setSelected(index);
        setAnswered(true);
        if (index === quiz.correct) {
            setTimeout(() => onComplete(), 1500);
        }
    };

    return (
        <div className="quiz-container">
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>📝 Quick Quiz</h3>
            <p className="quiz-question">{quiz.question}</p>
            <div className="quiz-options">
                {quiz.options.map((option, index) => (
                    <div
                        key={index}
                        className={`quiz-option ${selected === index ? (index === quiz.correct ? 'correct' : 'incorrect') : ''}`}
                        onClick={() => !answered && handleAnswer(index)}
                        style={{ cursor: answered ? 'default' : 'pointer' }}
                    >
                        {option}
                        {answered && index === quiz.correct && ' ✓'}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Main App Component
function App() {
    const [currentLesson, setCurrentLesson] = useState(0);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const [showQuiz, setShowQuiz] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const { completedLessons, setCompletedLessons, bookmarks, setBookmarks } = useProgress();
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    const lesson = lessons[currentLesson];
    const progress = (completedLessons.size / lessons.length) * 100;

    const categories = ['All', 'Fundamentals', 'Hooks', 'Patterns', 'State Management', 'Performance', 'Routing', 'Data Fetching', 'Testing', 'TypeScript', 'Deployment', 'Best Practices'];

    const filteredLessons = useMemo(() => {
        let filtered = lessons;
        if (filter !== 'All') {
            filtered = filtered.filter(l => l.category === filter);
        }
        if (searchQuery) {
            filtered = filtered.filter(l =>
                l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                l.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filtered;
    }, [filter, searchQuery]);

    const markComplete = () => {
        const newCompleted = new Set([...completedLessons, lesson.id]);
        setCompletedLessons(newCompleted);

        if (lesson.quiz && !showQuiz) {
            setShowQuiz(true);
        } else {
            if (currentLesson < lessons.length - 1) {
                setCurrentLesson(currentLesson + 1);
                setShowQuiz(false);
            } else {
                // Course completed!
                setTimeout(() => {
                    alert('🎉 Congratulations! You have completed the React Mastery course!\n\n✅ All ' + lessons.length + ' lessons completed!\n🏆 You can now download your certificate!\n\nKeep building amazing React applications! 🚀');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 300);
            }
        }
    };

    const toggleBookmark = (id) => {
        const newBookmarks = new Set(bookmarks);
        if (newBookmarks.has(id)) {
            newBookmarks.delete(id);
        } else {
            newBookmarks.add(id);
        }
        setBookmarks(newBookmarks);
    };

    const DemoComponent = getDemoComponent(lesson.id);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={`app-container ${theme}`}>
                <header className="header">
                    <div className="header-content">
                        <div className="logo">
                            <div className="logo-icon">⚛️</div>
                            <div>
                                <h1>React Mastery</h1>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>Zero to Hero Course</p>
                            </div>
                        </div>

                        <div className="header-controls">
                            <div className="progress-bar">
                                <div className="progress-label">
                                    <span>Progress</span>
                                    <span>{completedLessons.size}/{lessons.length}</span>
                                </div>
                                <div className="progress-track">
                                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>

                            <div className="user-info">
                                <span className="user-name">{user?.name || 'User'}</span>
                            </div>

                            <button
                                className="theme-toggle"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                title="Toggle theme"
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>

                            <button
                                className="header-profile-btn"
                                onClick={() => setShowProfile(true)}
                                title="My Profile"
                            >
                                👤 Profile
                            </button>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <div className="controls-section">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="🔍 Search lessons..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="filter-tabs">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`filter-tab ${filter === cat ? 'active' : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="nav-tabs">
                        {filteredLessons.map((l, index) => (
                            <button
                                key={l.id}
                                className={`nav-tab ${lessons.indexOf(l) === currentLesson ? 'active' : ''}`}
                                onClick={() => { setCurrentLesson(lessons.indexOf(l)); setShowQuiz(false); }}
                            >
                                <span className="tab-content">
                                    {completedLessons.has(l.id) && <span className="check">✓</span>}
                                    {bookmarks.has(l.id) && <span className="bookmark">🔖</span>}
                                    <span className="tab-title">{l.title}</span>
                                    <span className="tab-level" style={{
                                        background: l.level === 'Beginner' ? 'rgba(67,233,123,0.2)' :
                                            l.level === 'Intermediate' ? 'rgba(102,126,234,0.2)' :
                                                'rgba(245,87,108,0.2)',
                                        color: l.level === 'Beginner' ? '#43e97b' :
                                            l.level === 'Intermediate' ? '#667eea' : '#f5576c'
                                    }}>{l.level[0]}</span>
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="lesson-card">
                        <div className="lesson-header">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span className="lesson-number">Lesson {lesson.id}</span>
                                    <span className="lesson-badge" style={{
                                        background: lesson.level === 'Beginner' ? 'rgba(67,233,123,0.2)' :
                                            lesson.level === 'Intermediate' ? 'rgba(102,126,234,0.2)' :
                                                lesson.level === 'Expert' ? 'rgba(245,87,108,0.2)' : 'rgba(102,126,234,0.2)',
                                        color: lesson.level === 'Beginner' ? '#43e97b' :
                                            lesson.level === 'Intermediate' ? '#667eea' :
                                                lesson.level === 'Expert' ? '#f5576c' : '#667eea'
                                    }}>{lesson.level}</span>
                                    {lesson.duration && <span className="lesson-badge">⏱️ {lesson.duration}</span>}
                                </div>
                                <button
                                    className="bookmark-btn"
                                    onClick={() => toggleBookmark(lesson.id)}
                                    title={bookmarks.has(lesson.id) ? 'Remove bookmark' : 'Add bookmark'}
                                >
                                    {bookmarks.has(lesson.id) ? '🔖' : '📑'}
                                </button>
                            </div>
                            <h2>{lesson.title}</h2>
                            <p>{lesson.description}</p>
                        </div>

                        <h3 style={{ color: 'var(--text-accent)', marginBottom: '1rem' }}>🎯 Key Concepts:</h3>
                        <ul className="key-points">
                            {lesson.keyPoints.map((point, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: point }}></li>
                            ))}
                        </ul>

                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-label">💻 Example Code</span>
                            </div>
                            <pre><code>{lesson.code}</code></pre>
                        </div>

                        <h3 style={{ color: 'var(--text-accent)', margin: '2rem 0 1rem' }}>🚀 Live Demo:</h3>
                        <div className="demo-container">
                            <DemoComponent />
                        </div>

                        {lesson.exercise && (
                            <>
                                <h3 style={{ color: 'var(--text-accent)', margin: '2rem 0 1rem' }}>💪 Practice Exercise:</h3>
                                <Exercise exercise={lesson.exercise} onComplete={() => console.log('Exercise completed!')} />
                            </>
                        )}

                        <h3 style={{ color: 'var(--text-accent)', margin: '2rem 0 1rem' }}>🎮 React Playground:</h3>
                        <ReactPlayground
                            initialCode={`function UserComponent() {\n    const [message, setMessage] = useState('Hello from Playground!');\n    \n    return (\n        <div style={{ textAlign: 'center', padding: '2rem' }}>\n            <h2>{message}</h2>\n            <button onClick={() => setMessage('You clicked me!')}>\n                Click Me\n            </button>\n        </div>\n    );\n}`}
                        />

                        {showQuiz && lesson.quiz && (
                            <Quiz quiz={lesson.quiz} onComplete={markComplete} />
                        )}

                        <div className="lesson-nav">
                            <button
                                className="nav-button"
                                onClick={() => { setCurrentLesson(currentLesson - 1); setShowQuiz(false); }}
                                disabled={currentLesson === 0}
                            >
                                ← Previous
                            </button>
                            <button
                                className="nav-button primary"
                                onClick={markComplete}
                            >
                                {currentLesson === lessons.length - 1 ? '🎉 Complete Course' :
                                    completedLessons.has(lesson.id) ? 'Next Lesson →' : 'Mark Complete & Continue →'}
                            </button>
                        </div>
                    </div>

                    <div className="stats-footer">
                        <div className="stat-card">
                            <div className="stat-value">{completedLessons.size}</div>
                            <div className="stat-label">Completed</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{lessons.length - completedLessons.size}</div>
                            <div className="stat-label">Remaining</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{bookmarks.size}</div>
                            <div className="stat-label">Bookmarked</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{Math.round(progress)}%</div>
                            <div className="stat-label">Progress</div>
                        </div>
                    </div>
                </div>
            </div>
            {showProfile && <ProfilePage onClose={() => setShowProfile(false)} />}
        </ThemeContext.Provider>
    );
}

// Main App Wrapper with Authentication
function MainApp() {
    const { user, updateProgress } = useContext(AuthContext);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const { completedLessons, bookmarks } = useProgress();

    // Update user progress whenever completedLessons or bookmarks change
    useEffect(() => {
        if (user && updateProgress) {
            updateProgress(completedLessons, bookmarks);
        }
    }, [completedLessons, bookmarks, user, updateProgress]);

    if (!user) {
        return <AuthPage />;
    }

    // Admin Dashboard for admin users
    if (user.role === 'admin' && showDashboard) {
        return <AdminDashboard />;
    }

    // User Dashboard for regular users
    if (showDashboard && user.role !== 'admin') {
        return <UserDashboard onStartCourse={() => setShowDashboard(false)} />;
    }

    // Show certificate if requested
    if (showCertificate) {
        return <Certificate user={user} onClose={() => setShowCertificate(false)} />;
    }

    // Main course app with certificate button if 100% complete
    const progress = Math.round((completedLessons.size / lessons.length) * 100);
    const isComplete = progress === 100;

    return (
        <>
            <App />
            {isComplete && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    zIndex: 999
                }}>
                    <button
                        className="certificate-unlock-btn"
                        onClick={() => setShowCertificate(true)}
                        style={{
                            padding: '1rem 2rem',
                            fontSize: '1rem',
                            width: 'auto',
                            margin: 0
                        }}
                    >
                        🎓 Get Your Certificate
                    </button>
                </div>
            )}
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <AuthProvider>
        <MainApp />
    </AuthProvider>
);
