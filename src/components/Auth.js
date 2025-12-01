// Authentication & User Management with MySQL Backend
const { useState, useEffect, useContext, createContext } = React;

// API Base URL
const API_URL = 'http://localhost:3001/api';

// Auth Context
const AuthContext = createContext();

// Auth Provider Component
function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('react-course-user');
        return saved ? JSON.parse(saved) : null;
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            localStorage.setItem('react-course-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('react-course-user');
        }
    }, [user]);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error || 'Login failed' };
            }

            setUser(data.user);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error. Please check if the server is running.' };
        } finally {
            setLoading(false);
        }
    };

    const signup = async (name, email, password) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error || 'Registration failed' };
            }

            setUser(data.user);
            return { success: true };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: 'Network error. Please check if the server is running.' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('react-course-user');
    };

    const updateProgress = async (completedLessons, bookmarks) => {
        if (!user) return;

        try {
            const progressPercentage = Math.round((completedLessons.size / 22) * 100);

            const response = await fetch(`${API_URL}/progress/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    completedLessons: Array.from(completedLessons),
                    bookmarks: Array.from(bookmarks),
                    progressPercentage
                })
            });

            if (response.ok) {
                // Update local user state
                setUser({
                    ...user,
                    completedLessons: Array.from(completedLessons),
                    bookmarks: Array.from(bookmarks),
                    progress: progressPercentage
                });
            }
        } catch (error) {
            console.error('Update progress error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateProgress, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Login/Signup Component
function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login, signup, loading } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (!isLogin && !formData.name) {
            setError('Please enter your name');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const result = isLogin
            ? await login(formData.email, formData.password)
            : await signup(formData.name, formData.email, formData.password);

        if (!result.success) {
            setError(result.error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    return (
        <div className="auth-page">
            <div className="auth-background"></div>
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">
                            <div className="logo-icon">⚛️</div>
                            <h1>React Mastery</h1>
                        </div>
                        <p className="auth-subtitle">
                            {isLogin ? 'Welcome back!' : 'Start your React journey'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="form-input"
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="form-input"
                            />
                        </div>

                        {error && (
                            <div className="auth-error">
                                ⚠️ {error}
                            </div>
                        )}

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? '⏳ Please wait...' : (isLogin ? '🚀 Sign In' : '✨ Create Account')}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}
                            <button
                                className="auth-switch"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                    setFormData({ name: '', email: '', password: '' });
                                }}
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>

                    <div className="auth-features">
                        <div className="feature-item">
                            <span className="feature-icon">📚</span>
                            <span>22 Comprehensive Lessons</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">💪</span>
                            <span>Hands-on Exercises</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🎮</span>
                            <span>Live Code Playground</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🏆</span>
                            <span>Track Your Progress</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// User Dashboard Component
function UserDashboard({ onStartCourse }) {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="dashboard-overlay">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <div>
                        <h2>👋 Welcome, {user.name}!</h2>
                        <p className="dashboard-email">{user.email}</p>
                    </div>
                    <button className="logout-btn" onClick={logout}>
                        🚪 Logout
                    </button>
                </div>

                <div className="dashboard-stats">
                    <div className="stat-box">
                        <div className="stat-icon">📊</div>
                        <div className="stat-info">
                            <div className="stat-value">{user.progress || 0}%</div>
                            <div className="stat-label">Progress</div>
                        </div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-icon">✅</div>
                        <div className="stat-info">
                            <div className="stat-value">{user.completedLessons?.length || 0}</div>
                            <div className="stat-label">Completed</div>
                        </div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-icon">🔖</div>
                        <div className="stat-info">
                            <div className="stat-value">{user.bookmarks?.length || 0}</div>
                            <div className="stat-label">Bookmarks</div>
                        </div>
                    </div>
                </div>

                <button className="start-course-btn" onClick={onStartCourse}>
                    {user.progress > 0 ? '📖 Continue Learning' : '🚀 Start Course'}
                </button>
            </div>
        </div>
    );
}

// Export components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthProvider, AuthContext, AuthPage, UserDashboard };
}
