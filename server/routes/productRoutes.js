const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const merchant = require('../middleware/authMerchant.js')
const { createProduct, updateProduct, deleteProduct, getProductById, getProducts,getCount,createProductReview,
  getTopProducts, getRecommendedProducts } = require('../controllers/productController.js');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, callback) => {
    const filename = Date.now() + '-' + file.originalname;
    callback(null, filename);
  },
});

const upload = multer({ storage: storage });


router.route('/create').post(auth, merchant, upload.single('image'), createProduct);
router.route('/updatebyid').put(auth, merchant, updateProduct)
router.route('/remove').delete(auth, merchant, deleteProduct)
router.route('/get-productbyid').get(getProductById)
router.route('/get-products').get(getProducts)
router.route('/get-recommended').get(getRecommendedProducts)
router.route('/total').get(auth,getCount);
router.route('/reviews').post(auth, createProductReview);
router.route('/top').get(getTopProducts);


module.exports = router;