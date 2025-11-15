import { UserModel } from '../models/user.model.js';

export const UserController = {
    // Create new user
    createUser: (req, res) => {
        const { name, avatar } = req.body;
        
        if (!name) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Name is required'
            });
        }

        const newUser = UserModel.create({ name, avatar });
        res.status(201).json(newUser);
    },

    // Get all users
    getAllUsers: (req, res) => {
        const users = UserModel.findAll();
        res.json(users);
    },

    // Get user by ID
    getUserById: (req, res) => {
        const userId = parseInt(req.params.id);
        const user = UserModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                error: 'Not Found',
                message: `User with ID ${userId} not found`
            });
        }

        res.json(user);
    },

    // Update user
    updateUser: (req, res) => {
        const { name, avatar } = req.body;
        const userId = parseInt(req.params.id);

        if (!name) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Name is required'
            });
        }

        const updatedUser = UserModel.update(userId, { name, avatar });
        
        if (!updatedUser) {
            return res.status(404).json({
                error: 'Not Found',
                message: `User with ID ${userId} not found`
            });
        }

        res.json(updatedUser);
    },

    // Delete user
    deleteUser: (req, res) => {
        const userId = parseInt(req.params.id);
        const deletedUser = UserModel.delete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                error: 'Not Found',
                message: `User with ID ${userId} not found`
            });
        }

        res.json({
            message: 'User deleted successfully',
            user: deletedUser
        });
    }
};