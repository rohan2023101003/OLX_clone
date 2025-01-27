const express = require('express');
const router = express.Router();


const { restrictTo } = require('../middlewares/auth');
const User = require('../models/user');

const { editProfile } = require('../controllers/user');

router.get('/home', async (req, res) => {
    try {
        const LoggedInUser = await User.findById(req.user.id);
        if (!LoggedInUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ LoggedInUser });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Failed to fetch user data' });
    }
});


router.get('/logout', (req, res) => {
    try {
        res.clearCookie('uid');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'An error occurred during logout' });
    }
});

router.get("/admin",restrictTo(['admin']),async (req,res)=>{
    const alldbUsers = await User.find();
    res.render('admin',{users:alldbUsers});
});


router
    .route("/editProfile")
    .patch(editProfile);



module.exports = router;