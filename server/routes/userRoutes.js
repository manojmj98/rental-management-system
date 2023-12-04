const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const { updatedUser, userProfile,getUsers,getCount,deleteUser, getUserID} = require('../controllers/userController.js');

// Get user profile from database 
router.get('/profile', auth, userProfile);

// Update a user profile in database 
router.put('/profile', auth, updatedUser);

router.post('/get-users',auth,getUsers); //TODO:should be get ideally
router.get('/total',auth,getCount);
router.delete('/:id',auth,deleteUser);
router.get('/get-id',auth, getUserID)

module.exports = router;