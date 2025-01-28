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
    verifyOtpAndCloseTransaction,
    getCancelledOrdersBySeller,
    getCancelledOrdersOfBuyer
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

router
    .route('/cancelledOrdersSeller')
    .get(getCancelledOrdersBySeller);

router
    .route('/cancelledOrdersBuyer')
    .get(getCancelledOrdersOfBuyer);

module.exports = router;