// Admin Dashboard Component
const { useState, useEffect, useContext } = React;

// API Base URL
const API_URL = 'http://localhost:3001/api';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        avgProgress: 0,
        completedUsers: 0
    });
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/admin/users`);
            const data = await response.json();

            if (data.success) {
                setUsers(data.users);
                calculateStats(data.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (usersList) => {
        const total = usersList.length;
        const totalProgress = usersList.reduce((sum, u) => sum + (u.progress_percentage || 0), 0);
        const completed = usersList.filter(u => u.progress_percentage === 100).length;

        setStats({
            totalUsers: total,
            avgProgress: total > 0 ? Math.round(totalProgress / total) : 0,
            completedUsers: completed
        });
    };

    const handleDeleteUser = async (userId, userName) => {
        if (!confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/admin/users/${userId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('User deleted successfully');
                fetchUsers(); // Refresh list
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    if (user?.role !== 'admin') {
        return (
            <div className="admin-access-denied">
                <h2>⛔ Access Denied</h2>
                <p>You do not have permission to access the Admin Dashboard.</p>
                <button className="nav-button primary" onClick={() => window.location.reload()}>
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div>
                    <h1>🛡️ Admin Dashboard</h1>
                    <p className="admin-subtitle">Manage users and monitor course progress</p>
                </div>
                <button className="logout-btn" onClick={logout}>
                    🚪 Logout
                </button>
            </div>

            <div className="admin-stats">
                <div className="admin-stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.totalUsers}</div>
                        <div className="stat-label">Total Users</div>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.avgProgress}%</div>
                        <div className="stat-label">Avg Progress</div>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-icon">🎓</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.completedUsers}</div>
                        <div className="stat-label">Completed</div>
                    </div>
                </div>
            </div>

            <div className="admin-users-section">
                <h2>📋 User Management</h2>

                {loading ? (
                    <div className="admin-loading">Loading users...</div>
                ) : (
                    <div className="admin-users-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Progress</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <span className={`role-badge ${u.role}`}>
                                                {u.role === 'admin' ? '🛡️' : '👤'} {u.role}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress-cell">
                                                <div className="mini-progress-bar">
                                                    <div
                                                        className="mini-progress-fill"
                                                        style={{ width: `${u.progress_percentage || 0}%` }}
                                                    ></div>
                                                </div>
                                                <span>{u.progress_percentage || 0}%</span>
                                            </div>
                                        </td>
                                        <td>{new Date(u.created_at).toLocaleDateString()}</td>
                                        <td>
                                            {u.role !== 'admin' && (
                                                <button
                                                    className="delete-user-btn"
                                                    onClick={() => handleDeleteUser(u.id, u.name)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

// Export component
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdminDashboard };
}
