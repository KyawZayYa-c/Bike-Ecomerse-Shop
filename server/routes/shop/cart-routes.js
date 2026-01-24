const express = require('express');
const router = express.Router();
const {addToCart, fetchCartItem, updateCartQty, deleteCartItem} = require('../../controllers/shop/cart-controller');

router.post('/add', addToCart);
router.get('/get/:userId', fetchCartItem);
router.put('/update-cart', updateCartQty);
router.delete('/:userId/:productId', deleteCartItem);


module.exports = router;