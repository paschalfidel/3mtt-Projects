// Import UUID library for generating unique IDs
import { v4 as uuidv4 } from 'uuid';

// In-memory array to store items
let items = [];

// Controller function to get all items
export const getItems = (req, res) => {
    try {
        // Check if items array is empty
        if (items.length === 0) {
            return res.status(200).json({ 
                message: 'No items found', 
                items: [] 
            });
        }
        
        // Return items if array is not empty
        res.status(200).json({
            message: 'Items retrieved successfully',
            items: items
        });
    } catch (error) {
        // Handle any unexpected errors with 500 status
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new item
export const createItem = (req, res) => {
    try {
        // Destructure required fields from request body
        const { name, description } = req.body;

        // Validate required fields are present
        if (!name || !description) {
            return res.status(400).json({ 
                error: 'All fields (name, description) are required' 
            });
        }

        // Create new item object with generated ID
        const item = {
            id: uuidv4(),
            name,
            description
        };

        // Add item to the array
        items.push(item);

        // Return success response with created item
        res.status(201).json({ 
            message: 'Item created successfully', 
            item 
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a specific item by ID
export const getItem = (req, res) => {
    try {
        // Get ID from URL parameters
        const { id } = req.params;

        // Find item in array
        const item = items.find(item => item.id === id);
        
        // Return 404 if item not found
        if (!item) {
            return res.status(404).json({ 
                error: `Item with id ${id} not found` 
            });
        }

        // Return found item
        res.status(200).json(item);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete an item
export const deleteItem = (req, res) => {
    try {
        // Get ID from URL parameters
        const { id } = req.params;

        // Check if item exists
        const itemExists = items.some(item => item.id === id);

        // Return 404 if item doesn't exist
        if (!itemExists) {
            return res.status(404).json({ 
                error: `Item with id ${id} not found` 
            });
        }

        // Filter out the item to be deleted
        items = items.filter(item => item.id !== id);

        // Return success message
        res.status(200).json({ 
            message: `Item with id ${id} deleted successfully` 
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update an item (full update)
export const updateItem = (req, res) => {
    try {
        // Get ID from URL parameters
        const { id } = req.params;

        // Get updated fields from request body
        const { name, description } = req.body;

        // Find item in array
        const itemIndex = items.findIndex(item => item.id === id);
        
        // Return 404 if item not found
        if (itemIndex === -1) {
            return res.status(404).json({ 
                error: `Item with id ${id} not found` 
            });
        }

        // Validate required fields for full update
        if (!name || !description) {
            return res.status(400).json({ 
                error: 'Both name and description are required for update' 
            });
        }

        // Update the item
        items[itemIndex] = { 
            id, 
            name, 
            description 
        };

        // Return success response with updated item
        res.status(200).json({ 
            message: 'Item updated successfully', 
            item: items[itemIndex] 
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};