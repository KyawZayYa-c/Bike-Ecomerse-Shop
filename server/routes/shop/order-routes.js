const express = require('express');
const router = express.Router();

const {createOrder, capturePayment , getAllOrdersByUser, getOrdersDetails} = require('../../controllers/shop/order_controller');

router.post('/create', createOrder);
router.post('/capture', capturePayment);
router.get('/list/:userId', getAllOrdersByUser);
router.get('/details/:id', getOrdersDetails);


module.exports = router;