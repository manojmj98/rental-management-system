const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')
const merchant = require('../middleware/authMerchant.js')
const {getComplaints,
    createComplaint,
    updateStatus,
    getComplaintById} = require('../controllers/complaintsController.js')


router.route('/results').get(auth,getComplaints);
router.route('/').post(auth,createComplaint);
router.route('/updatebyid').put(updateStatus);
router.route('/get-complaintbyid').get(getComplaintById)
module.exports = router;