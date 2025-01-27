const User = require('../models/user');
const Item = require('../models/item');
const mongoose = require('mongoose');
const Order = require('../models/order');
const Cart = require('../models/cart');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function handleAddOrder(req, res) {
  const { cart } = req.body;
  console.log(cart);
  if (!cart || !cart.items || cart.items.length === 0) {
    return res.status(400).json({ error: 'Invalid input: Cart is empty or missing' });
  }

  const buyerEmail = cart.userId;
  const orders = [];
  const otps = [];

  try {
    for (const cartItem of cart.items) {
      const { itemId } = cartItem;
      const sellerEmail = itemId.sellerId;
      const productId = itemId._id;
      const itemName = itemId.name;
      const itemPrice = itemId.price;
      const order = new Order({
        buyerEmail,
        sellerEmail,
        productId,
        itemName,
        itemPrice,
        status: 'processing'
      });

      const otp = crypto.randomBytes(3).toString('hex');
      order.otp = otp;
      otps.push({ productId, otp }); 
      console.log('Generated OTP:', otp);  
      await order.save();
      orders.push(order);
    }

    return res.status(201).json({ message: 'Orders created successfully', orders, otps });
  } catch (error) {
    console.error('Error creating orders:', error);
    return res.status(500).json({ error: 'Internal Server Error: Could not create orders' });
  }
}

async function regenerateOtp(req, res) {
    const { orderId } = req.body;
  
    if (!orderId) {
      return res.status(400).json({ error: 'Invalid input: Order ID is required' });
    }
  
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      const otp = crypto.randomBytes(3).toString('hex'); 
      order.otp = otp;
      await order.save();
  
      return res.status(200).json({ message: 'OTP regenerated successfully', otp });
    } catch (error) {
      console.error('Error regenerating OTP:', error);
      return res.status(500).json({ error: 'Internal Server Error: Could not regenerate OTP' });
    }
  }


async function getProcessingOrdersForBuyer(req, res) {
    try {
      const orders = await Order.find({ buyerEmail: req.user.email, status: 'processing' });
      return res.status(200).json({ orders });
    } catch (error) {
      console.error('Error fetching processing orders for buyer:', error);
      return res.status(500).json({ error: 'Internal Server Error: Could not fetch orders' });
    }
}

async function getSuccessfulOrdersForBuyer(req, res) {
    try {
      const orders = await Order.find({ buyerEmail: req.user.email, status: 'successful' });
      return res.status(200).json({ orders });
    } catch (error) {
      console.error('Error fetching successful orders for buyer:', error);
      return res.status(500).json({ error: 'Internal Server Error: Could not fetch orders' });
    }
}


async function getSuccessfulOrdersForSeller(req, res) {
    try {
      const orders = await Order.find({ sellerEmail: req.user.email, status: 'successful' });
      return res.status(200).json({ orders });
    } catch (error) {
      console.error('Error fetching successful orders for seller:', error);
      return res.status(500).json({ error: 'Internal Server Error: Could not fetch orders' });
    }
  }
  
async function getProcessingOrdersForSeller(req, res) {
    try {
      const orders = await Order.find({ sellerEmail: req.user.email, status: 'processing' });
      return res.status(200).json({ orders });
    } catch (error) {
      console.error('Error fetching processing orders for seller:', error);
      return res.status(500).json({ error: 'Internal Server Error: Could not fetch orders' });
    }
}

async function getOrderById(req, res) {
    const { orderId } = req.body;
   console.log(orderId);
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      return res.status(200).json({ order });
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      return res.status(500).json({ error: 'Internal Server Error: Could not fetch order' });
    }
  }

  async function verifyOtpAndCloseTransaction(req, res) {
    const { orderId, otp } = req.body;
    console.log(orderId, otp);
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      console.log(order.otp);
     
      const isOtpValid = await bcrypt.compare(otp, order.otp);
      console.log(isOtpValid);
      if (!isOtpValid) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }
  
      order.status = 'successful';
      await order.save();

        // Delete the item from the items table
        const itemId = order.productId;
        await Item.findByIdAndDelete(itemId);

        // Remove the item from any cart
        await Cart.updateMany(
        { 'items.itemId': itemId },
        { $pull: { items: { itemId: itemId } } }
        );

      return res.status(200).json({ message: 'Transaction closed successfully' });
    } catch (error) {
      console.error('Error closing transaction:', error);
      return res.status(500).json({ error: 'Internal Server Error: Could not close transaction' });
    }
  }

module.exports = { 
    handleAddOrder, 
    regenerateOtp, 
    getProcessingOrdersForBuyer, 
    getSuccessfulOrdersForBuyer, 
    getSuccessfulOrdersForSeller,
    getProcessingOrdersForSeller,
    getOrderById,
    verifyOtpAndCloseTransaction
};