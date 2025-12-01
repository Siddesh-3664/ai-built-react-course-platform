// Profile Component for User Settings
const { useState, useContext } = React;

function ProfilePage({ onClose }) {
    const { user, logout } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        // Validation
        if (!formData.name.trim()) {
            setMessage({ type: 'error', text: 'Name is required' });
            return;
        }

        if (formData.password && formData.password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    name: formData.name,
                    password: formData.password || undefined
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage({ type: 'error', text: data.error || 'Update failed' });
                return;
            }

            // Update local user data
            const updatedUser = { ...user, name: formData.name };
            localStorage.setItem('react-course-user', JSON.stringify(updatedUser));

            setMessage({ type: 'success', text: '✅ Profile updated successfully!' });
            setFormData({ ...formData, password: '', confirmPassword: '' });
            setIsEditing(false);

            // Refresh page after 1.5 seconds to show updated name
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error('Profile update error:', error);
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            password: '',
            confirmPassword: ''
        });
        setMessage({ type: '', text: '' });
        setIsEditing(false);
    };

    return (
        <div className="profile-overlay">
            <div className="profile-card">
                <div className="profile-header">
                    <h2>👤 My Profile</h2>
                    <button className="profile-close-btn" onClick={onClose}>×</button>
                </div>

                {message.text && (
                    <div className={message.type === 'success' ? 'profile-success' : 'profile-error'}>
                        {message.text}
                    </div>
                )}

                {!isEditing ? (
                    <>
                        <div className="profile-info">
                            <div className="profile-info-item">
                                <span className="profile-info-label">Name:</span>
                                <span className="profile-info-value">{user?.name}</span>
                            </div>
                            <div className="profile-info-item">
                                <span className="profile-info-label">Email:</span>
                                <span className="profile-info-value">{user?.email}</span>
                            </div>
                            <div className="profile-info-item">
                                <span className="profile-info-label">Role:</span>
                                <span className="profile-info-value">
                                    {user?.role === 'admin' ? '👑 Admin' : '👨‍🎓 Student'}
                                </span>
                            </div>
                            <div className="profile-info-item">
                                <span className="profile-info-label">Progress:</span>
                                <span className="profile-info-value">{user?.progress || 0}%</span>
                            </div>
                        </div>

                        <div className="profile-actions">
                            <button
                                className="profile-save-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                ✏️ Edit Profile
                            </button>
                            <button
                                className="profile-cancel-btn"
                                onClick={() => {
                                    if (confirm('Are you sure you want to logout?')) {
                                        logout();
                                        onClose();
                                        // Force page reload to clear all state and redirect to login
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 100);
                                    }
                                }}
                            >
                                🚪 Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">New Password (optional)</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Leave blank to keep current password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your new password"
                            />
                        </div>

                        <div className="profile-actions">
                            <button
                                type="submit"
                                className="profile-save-btn"
                                disabled={loading}
                            >
                                {loading ? '⏳ Saving...' : '💾 Save Changes'}
                            </button>
                            <button
                                type="button"
                                className="profile-cancel-btn"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

// Export component
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProfilePage };
}
