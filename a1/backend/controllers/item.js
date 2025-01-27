const User = require('../models/user');
const Item = require('../models/item');
const mongoose = require('mongoose');

async function handleAddItem(req, res) {
    const { name, price, description, category } = req.body;

    if (!name || !price || !description || !category) {
        return res.status(400).json({ error: 'Invalid input: Missing required fields' });
    }

    if (!req.user) {
        return res.status(401).json({ error: 'You must be logged in to add an item' });
    }

    try {
        const item = new Item({
            name,
            price,
            description,
            category,
            sellerId: req.user.email
        });

        await item.save();
        return res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        console.error('Error creating item:', error);
        return res.status(500).json({ error: 'Internal Server Error: Could not create item' });
    }
}


async function getItemsNotBelongingToCurrentUser(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'You must be logged in to view items' });
    }

    try {
        const items = await Item.find({ sellerId: { $ne: req.user.email } });
      
        return res.status(200).json({ items });
    } catch (error) {
        console.error('Error fetching items:', error);
        return res.status(500).json({ error: 'Internal Server Error: Could not fetch items' });
    }
}

async function getItemsBelongingToCurrentUser(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'You must be logged in to view items' });
    }
    // console.log('User:', req.user.id);
    try {
        const items = await Item.find({ sellerId: req.user.email });
        // items.forEach(item => {
        //     console.log(`Item ID: ${item.id}`);
        // });
        return res.status(200).json({ items });
    } catch (error) {
        console.error('Error fetching items:', error);
        return res.status(500).json({ error: 'Internal Server Error: Could not fetch items' });
    }
}




module.exports = {
    handleAddItem,
    getItemsNotBelongingToCurrentUser,
    getItemsBelongingToCurrentUser
};