const express = require('express');
const User  = require('../models/userModel.js');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.js');
const { EMAIL_PROVIDER } = require('../constants/constants.js');


// Register new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;

        if (!email) {
            return res
              .status(400)
              .json({ error: 'You must enter an email address.' });
        }
      
        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'You must enter your full name.' });
        }
    
        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ error: 'That email address is already in use.' });
        }

        const user = new User({
            username,
            email,
            password,
            firstName,
            lastName
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt)

        user.password = hash

        const registeredUser = await user.save();


        generateToken(res, user._id)
        res.status(200).json({
            success: true,
            user: {
                id: registeredUser.id,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email,
                role: registeredUser.role
            }
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

// Authentication
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) {
            return res.status(400).json({ error: 'You must enter an email address.' })
        }

        
        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: 'No user found for this email address.' })
        }

        if (user && user.provider !== EMAIL_PROVIDER.Email) {
            return res.status(400).send({ error: `That email address is already in use using ${user.provider} provider.` });
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            return res.status(400).json({
                success: false,
                error: 'Password Incorrect'
            })
        }

        generateToken(res, user._id)
        res.status(200).json({ 
            success: true,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

// Delete JWT cookie
router.post('/logout', async (req, res) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});


// Get user profile from database 
router.route('/profile').get(auth, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

// Update a user profile in database 
router.route('/profile').put(auth, async (req, res) => {
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


const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', 
        sameSite: 'strict', 
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};
    

module.exports = router;