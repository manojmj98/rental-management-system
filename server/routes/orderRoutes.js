const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const merchant = require('../middleware/authMerchant.js')
const {createOrder,getOrders,getCount, payOrder} = require('../controllers/orderController.js')


router.route('/get-orders').post(auth,getOrders);//TODO:Should be get ideally
router.route('/create').post(auth,createOrder);
router.route('/total').get(auth,getCount);



module.exports = router;