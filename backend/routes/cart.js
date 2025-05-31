const express = require('express');
const router = express.Router();
const { addToCart ,getCart ,removeFromCart,clearCart} = require('../controllers/cart');



router
    .route("/add")
    .post(addToCart);

router
    .route("/myCart")
    .get(getCart);

router
    .route("/remove")
    .delete(removeFromCart);

router
    .route("/clear")
    .delete(clearCart);


module.exports = router;