const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Item = require('../models/item');
const {handleAddItem }= require('../controllers/item');
const {getItemsNotBelongingToCurrentUser, getItemsBelongingToCurrentUser} = require('../controllers/item');


router
    .route("/add")
    .post(handleAddItem);
router
    .route("/all")
    .get(getItemsNotBelongingToCurrentUser);

router
    .route("/myProducts")
    .get(getItemsBelongingToCurrentUser);



module.exports = router;