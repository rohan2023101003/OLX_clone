const User = require('../models/user');
const{v4: uuidv4} = require('uuid');
const {setUser} = require('../service/auth');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function handlePOSTuser(req, res) {
    const body = req.body;

    if (!body || !body.first_name || !body.last_name || !body.age || !body.contact ||  !body.email || !body.password) {
        return res.status(400).json({ error: 'Bad Request: Missing required fields' });
    }

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
        return res.status(400).json({ message: 'Account already exists with this email.' });
        }
    } catch (error) {
        console.error('Error checking for existing user:', error);
        return res.status(500).json({ error: 'Internal Server Error: Could not create user' });
    }
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hashedPassword,
            age: body.age,
            contact: body.contact,
            role: body.role || 'normal',
        });
        return res.status(201).json({ message: 'User created successfully', user: result });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal Server Error: Could not create user' });
    }
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = setUser(user);
    res.cookie('uid', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }); // Cookie will persist for 7 days
    return res.status(200).json({ message: 'Login successful', user });
}




async function editProfile(req, res) {
    const updates = req.body; 

    try {
        
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        // console.log("user is", req.user);
        //for id use {id:req.user.id} 
        const updatedUser = await User.findOneAndUpdate({ email: req.user.email }, updates, { 
            new: true,
            runValidators: true, 
        });


        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(400).json({ error: "Failed to update profile", details: error.message });
    }
}


module.exports = {
    handlePOSTuser,
    handleUserLogin,
    editProfile
}