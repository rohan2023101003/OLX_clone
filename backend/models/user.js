const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    contact: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String,required:true, default: "normal" },

});

const User = mongoose.model("user", userSchema);

module.exports = User;
