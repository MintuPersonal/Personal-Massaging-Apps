import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Backend server is running successfully!',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// API documentation route
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the NECX Messaging API',
        endpoints: {
            health: 'GET /api/health',
            users: {
                create: 'POST /api/users',
                list: 'GET /api/users',
                getOne: 'GET /api/users/:id',
                update: 'PUT /api/users/:id',
                delete: 'DELETE /api/users/:id'
            }
        }
    });
});

// Mount user routes
app.use('/api/users', userRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `The route ${req.originalUrl} does not exist on this server`
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📍 API base: http://localhost:${PORT}/api`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});
 