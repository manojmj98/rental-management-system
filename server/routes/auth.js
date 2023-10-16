const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const nodemailer = require('nodemailer');
const { EMAIL_PROVIDER } = require('../constants/constants.js');
const {googleOauthHandler} = require('../controller/authController.js')

//import googleOauthHandler from '../controller/sessionsController'
const { registerUser, loginUser, logoutUser, resetPassword, forgotPassword, tokenReset, createQuestions, verifyQuestions, getQuestions } = require('../controllers/authController.js')

// Register new user
router.post('/register', registerUser);
// Authentication
router.post('/login',loginUser);
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
        const { password, confirmPassword } = req.body;


        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const match = password === confirmPassword;

        if (!match) {
            return res.status(400).json({ error: 'Passwords do not match' });

        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(confirmPassword, salt);

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

        if (process.env.NODE_ENV == 'development') {
            console.log(resetLink);
        }
        else {
            transport.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(400).json({ error: 'Email failed to send' });
                }
            });
        }


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

router.post('/google',async (req,res)=> {
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
router.post('/logout', logoutUser);
router.put('/reset', auth, resetPassword);
router.post("/forgot", forgotPassword);
router.put('/reset/:token', tokenReset);
router.put('/question', auth, createQuestions);
router.post('/question', verifyQuestions);
router.get('/question', getQuestions);

module.exports = router;