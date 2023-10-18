const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const merchant = require('../middleware/authMerchant.js')
const { createProduct, updateProduct, deleteProduct, getProductById, getProducts } = require('../controllers/productController.js');


router.route('/create').post(auth, merchant, createProduct);
router.route('/updatebyid').put(auth, merchant, updateProduct)
router.route('/remove').delete(auth, merchant, deleteProduct)
router.route('/get-productbyid').get(auth, getProductById)
router.route('/get-products').get(auth, getProducts)
module.exports = router;