// In-memory storage for users (in a real app, this would be a database)
const users = [];
let nextUserId = 1;

export const UserModel = {
    // Create a new user
    create: (userData) => {
        const newUser = {
            id: nextUserId++,
            name: userData.name,
            avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}`,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        return newUser;
    },

    // Find user by ID
    findById: (id) => {
        return users.find(user => user.id === id);
    },

    // Get all users
    findAll: () => {
        return users;
    },

    // Update user
    update: (id, userData) => {
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return null;

        users[index] = {
            ...users[index],
            ...userData,
            updatedAt: new Date().toISOString()
        };
        return users[index];
    },

    // Delete user
    delete: (id) => {
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return null;
        
        const deletedUser = users.splice(index, 1)[0];
        return deletedUser;
    }
};