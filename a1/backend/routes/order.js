const express = require('express');
const router = express.Router();
const { 
    handleAddOrder, 
    regenerateOtp,
    getProcessingOrdersForBuyer, 
    getSuccessfulOrdersForBuyer, 
    getSuccessfulOrdersForSeller,
    getProcessingOrdersForSeller,
    getOrderById,
    verifyOtpAndCloseTransaction
} = require('../controllers/order');

router
  .route('/addOrder')
  .post(handleAddOrder);

router
  .route('/regenerateOtp')
  .post(regenerateOtp);

router
    .route('/processingOrdersBuyer')
    .get(getProcessingOrdersForBuyer);
router
    .route('/boughtOrders')
    .get(getSuccessfulOrdersForBuyer);
router
    .route('/soldOrders')
    .get(getSuccessfulOrdersForSeller);
router
    .route('/processingOrdersSeller')
    .get(getProcessingOrdersForSeller);

router
    .route('/orderById')
    .post(getOrderById);
router
    .route('/verifyOtp')
    .post(verifyOtpAndCloseTransaction);

module.exports = router;