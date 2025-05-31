const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'item',
                required: true
            }
        }
    ]
}, {
    timestamps: true // Adds timestamps to the document: createdAt, updatedAt
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;