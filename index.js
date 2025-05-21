// Import required modules
import express from 'express';
import itemsRoutes from './routes/items.js';

// Initialize Express application
const app = express();

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the items routes at the '/items' path (CORRECTED from '/users')
app.use('/items', itemsRoutes);

// Root route - simple welcome message
app.get('/', (req, res) => res.json({ message: "Hello, World!" }));

// 404 handler for invalid routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Error handling middleware (catches any unhandled errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));