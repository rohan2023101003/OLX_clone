const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const orderSchema = new mongoose.Schema({
  buyerEmail: {
    type: String,
    required: true
  },
  sellerEmail: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'item'
  },
  itemName: {
    type: String,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['processing', 'successful', 'cancelled'],
    default: 'processing'
  }
});


orderSchema.pre('save', async function (next) {
  const order = this;
  if (order.isModified('otp')) {
    const salt = await bcrypt.genSalt(10);
    order.otp = await bcrypt.hash(order.otp, salt);
  }
  next();
});


orderSchema.methods.generateOTP = function () {
  const otp = crypto.randomBytes(3).toString('hex');
  this.otp = otp;
//   console.log('Generated OTP:', otp);
  return otp;
};

const Order = mongoose.model('order', orderSchema);

module.exports = Order;