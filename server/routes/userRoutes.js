const express = require('express');
const User  = require('../models/userModel.js');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.js');
const { EMAIL_PROVIDER } = require('../constants/constants.js');

// Get user profile from database 
router.get('/profile',auth, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

// Update a user profile in database 
router.put('/profile',auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (user) {

            user.email = req.body.email || user.email;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt)
        
                user.password = hash
        
            }

            const updatedUser = await user.save();
            res.status(200).json({
                _id: updatedUser._id,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                phoneNumber: updatedUser.phoneNumber
            })
        } else {
            res.status(404).json({message: 'User not found'});    
        }

    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

module.exports = router;