const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const merchant = require('../middleware/authMerchant.js')
const { createProduct, updateProduct, deleteProduct, getProductById, getProducts } = require('../controllers/productController.js');


router.route('/create').post(auth, merchant, createProduct);
router.route('/update/:id').put(auth, merchant, updateProduct)
router.route('/remove/:id').delete(auth, merchant, deleteProduct)
router.route('/get-productbyid').post(auth, merchant, getProductById)
router.route('/get-products').post(auth, merchant, getProducts)
module.exports = router;