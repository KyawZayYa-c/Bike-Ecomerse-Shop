const express = require('express');
const router = express.Router();

const {getAllOrdersOfAllUsers, getOrdersDetailsForAdmin, updateOrderStatus} = require('../../controllers/admin/order-controller');

router.get('/get', getAllOrdersOfAllUsers);
router.get('/details/:id', getOrdersDetailsForAdmin);
router.put('/update/:id', updateOrderStatus);

module.exports = router;