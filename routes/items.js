// Import Express and controller functions
import express from 'express';
import { getItems, createItem, getItem, deleteItem, updateItem } from '../controllers/items.js';

// Create a router instance
const router = express.Router();

// Define routes and associate them with controller functions

// GET /items - Get all items
router.get('/', getItems);

// POST /items - Create a new item
router.post('/', createItem);

// GET /items/:id - Get a specific item by ID
router.get('/:id', getItem);

// DELETE /items/:id - Delete an item by ID
router.delete('/:id', deleteItem);

// PUT /items/:id - Fully update an item by ID
router.put('/:id', updateItem);

// Export the router to be used in the main application
export default router;