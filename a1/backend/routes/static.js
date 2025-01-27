const express = require('express');
const router = express.Router();
const User = require('../models/user');


const { handlePOSTuser, handleUserLogin } = require('../controllers/user');


router.get('/login',(req,res)=>{
    res.render('login');
});

router.get('/signup',(req,res)=>{
    res.render('signup');
});

router
    .route("/signup")
    .post(handlePOSTuser);

router
    .route("/login")
    .post(handleUserLogin);



    
module.exports = router;