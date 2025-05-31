const { get } = require('mongoose');
const Cart = require('../models/cart');
const Item = require('../models/item');

async function addToCart(req, res) {
    const { itemId} = req.body;
    console.log(itemId);
    if (!req.user) {
        return res.status(401).json({ error: 'You must be logged in to add items to the cart' });
    }

    if (!itemId) {
        return res.status(400).json({ error: 'Invalid input: Missing required fields' });
    }

    try {
        let cart = await Cart.findOne({ userId: req.user.email });

        if (!cart) {
            cart = new Cart({ userId: req.user.email, items: [] });
        }

        const itemExists = cart.items.some(item => item.itemId.toString() === itemId);

        if (itemExists) {
            return res.status(400).json({ error: 'Item already in cart' });
        } else {
            cart.items.push({ itemId });
        }

        await cart.save();
        return res.status(200).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Internal Server Error: Could not add item to cart' });
    }
}

async function getCart(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'You must be logged in to view your cart' });
    }
    try {
        const cart = await Cart.findOne({ userId: req.user.email }).populate('items.itemId');
        // console.log(cart);
        return res.status(200).json({ cart });
        
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ error: 'Internal Server Error: Could not fetch cart' });
    }
}

async function removeFromCart(req, res) {
    const { itemId } = req.body;

    if (!req.user) {
        return res.status(401).json({ error: 'You must be logged in to remove items from the cart' });
    }

    if (!itemId) {
        return res.status(400).json({ error: 'Invalid input: Missing required fields' });
    }

    try {
        const cart = await Cart.findOne({ userId: req.user.email });

        if (!cart) {
            return res.status(400).json({ error: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(400).json({ error: 'Item not found in cart' });
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();
        return res.status(200).json({ message: 'Item removed from cart successfully', cart });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return res.status(500).json({ error: 'Internal Server Error: Could not remove item from cart' });
    }
}

async function clearCart(req, res) {
    if (!req.user) {
        return res.status(401).json({ error: 'You must be logged in to clear your cart' });
    }

    try {
        const cart = await Cart.findOne({ userId: req.user.email });

        if (!cart) {
            return res.status(400).json({ error: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();
        return res.status(200).json({ message: 'Cart cleared successfully', cart });
    } catch (error) {
        console.error('Error clearing cart:', error);
        return res.status(500).json({ error: 'Internal Server Error: Could not clear cart' });
    }
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart
};