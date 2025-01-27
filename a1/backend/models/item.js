const mongoose = require('mongoose');
const Categories = [
    "Clothing",                // 0
    "Grocery",                 // 1
    "Electronics",             // 2
    "Stationery",              // 3
    "Books",                   // 4
    "Home Appliances",         // 5
    "Furniture",               // 6
    "Sports Equipment",        // 7
    "Accessories",             // 8
    "Footwear",                // 9
    "Bags",                    // 10
    "Food & Beverages",        // 11
    "Toys & Games",            // 12
    "Beauty & Personal Care",  // 13
    "Health & Wellness",       // 14
    "Musical Instruments",     // 15
    "Art & Craft Supplies",    // 16
    "Event Tickets",           // 17
    "Project Components",      // 18
    "Tech Accessories",        // 19
    "Pre-owned Items",         // 20
    "IIIT Merchandise",        // 21
    "Mobile Accessories",      // 22
    "Garden Supplies",         // 23
    "Pet Supplies",            // 24
    "Automobile Accessories",  // 25
    "Gaming Accessories",      // 26
    "Kitchenware",             // 27
    "Baby Products",           // 28
    "Office Supplies",         // 29
    "Travel Essentials",       // 30
    "Collectibles",            // 31
    "Handmade Items",          // 32
    "Rental Services",         // 33
    "Fitness Equipment",       // 34
    "Photography Gear",        // 35
    "Decorative Items"         // 36
  ];
  
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: Categories,
        required: true
    },
    sellerId: {
        type: String, 
        required: true,
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;
