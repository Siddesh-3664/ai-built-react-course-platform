// API Utility Functions
// Centralized API calls for the React Mastery Course

const API_URL = 'http://localhost:3001/api';

/**
 * API utility object with all backend endpoints
 */
const api = {
    // Authentication endpoints
    auth: {
        login: async (email, password) => {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            return response.json();
        },

        register: async (name, email, password) => {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            return response.json();
        }
    },

    // User endpoints
    users: {
        updateProfile: async (userId, data) => {
            const response = await fetch(`${API_URL}/users/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, ...data })
            });
            return response.json();
        }
    },

    // Progress endpoints
    progress: {
        update: async (userId, completedLessons, bookmarks, progressPercentage) => {
            const response = await fetch(`${API_URL}/progress/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    completedLessons,
                    bookmarks,
                    progressPercentage
                })
            });
            return response.json();
        },

        get: async (userId) => {
            const response = await fetch(`${API_URL}/progress/${userId}`);
            return response.json();
        }
    },

    // Admin endpoints
    admin: {
        getAllUsers: async () => {
            const response = await fetch(`${API_URL}/admin/users`);
            return response.json();
        },

        deleteUser: async (userId) => {
            const response = await fetch(`${API_URL}/admin/users/${userId}`, {
                method: 'DELETE'
            });
            return response.json();
        }
    },

    // Health check
    health: async () => {
        const response = await fetch(`${API_URL}/health`);
        return response.json();
    }
};

// Export for use in components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { api, API_URL };
}
