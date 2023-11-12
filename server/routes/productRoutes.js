const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const merchant = require('../middleware/authMerchant.js')
const { createProduct, updateProduct, deleteProduct, getProductById, getProducts,getCount, getRecommendedProducts } = require('../controllers/productController.js');


router.route('/create').post(auth, merchant, createProduct);
router.route('/updatebyid').put(auth, merchant, updateProduct)
router.route('/remove').delete(auth, merchant, deleteProduct)
router.route('/get-productbyid').get(getProductById)
router.route('/get-products').get(getProducts)
router.route('/get-recommended').get(getRecommendedProducts)
router.route('/total').get(auth,getCount);
module.exports = router;