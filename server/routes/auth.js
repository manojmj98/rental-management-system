const express = require('express');
const User = require('../models/userModel.js');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.js');
const nodemailer = require('nodemailer');
const { EMAIL_PROVIDER } = require('../constants/constants.js');
const {googleOauthHandler} = require('../controller/sessionsController')

//import googleOauthHandler from '../controller/sessionsController'

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
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;

        const registeredUser = await user.save();


        generateToken(res, user._id);
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
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'You must enter an email address.' });
        }


        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'No user found for this email address.' });
        }

        if (user && user.provider !== EMAIL_PROVIDER.Email) {
            return res.status(400).send({ error: `That email address is already in use using ${user.provider} provider.` });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                success: false,
                error: 'Password Incorrect'
            })
        }

        generateToken(res, user._id)
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
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


router.put('/reset', auth, async (req, res) => {
    try {

        const { password, newPassword } = req.body;

        
        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const match = await bcrypt.compare(password, User.password);

        if (!match) {
            return res.status(400).json({ error: 'Previous password is incorrect' });

        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        user.password = hash;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email
        })

    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

router.post("/forgot", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'You must enter an email address.' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid Email' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "5m",
        });

        // Might need changed
        const resetLink = process.env.NODE_ENV == 'development' ? `http:/localhost:3000/reset/${token}` : `http:/bot-bazaar.com/reset/${token}`;

        var transport = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api",
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: "noreply@bot-bazaar.com",
            to: email,
            subject: "BotBazaar Password Reset Request",
            text: resetLink
        };

        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(400).json({ error: 'Email failed to send' });
            }
        });


        res.status(200).json({ message: "Email sent" });

    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

router.put('/reset/:token', async (req, res) => {
    try {
        
        
        const { password } = req.body;
        const token = req.params.token;
        
        if (!password) {
            return res.status(400).json({ error: 'You must enter a password' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        user.password = hash;

        user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });

    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

router.get('/google',async (req,res)=> {
    try {
        console.log('In the router')
        googleOauthHandler(req,res)
        
    } catch (error) {
        console.log(e)
        return res.redirect(`${process.env.CLIENT_ORIGIN}/oauth/error`)
    }
    
    
})
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