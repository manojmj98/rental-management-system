const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { EMAIL_PROVIDER, SECURITY_QUESTIONS } = require('../constants/constants.js');


const registerUser = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, role } = req.body;

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

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res
                .status(400)
                .json({ error: 'That email address is already in use.' });
        }

        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res
                .status(400)
                .json({ error: 'That username is already in use.' });
        }

        if (role == 'ADMIN') {
            return res
                .status(400)
                .json({ error: 'Creation of admin account is restricted' });
        }

        const user = new User({
            username,
            email,
            password,
            firstName,
            lastName,
            role
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
};

const loginUser =  async (req, res) => {
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
}

const logoutUser = async (req, res) => {
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
}

const resetPassword = async (req, res) => {
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
}


const forgotPassword = async (req, res) => {
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
        const resetLink = process.env.NODE_ENV == 'development' ? `http://localhost:3000/reset/${token}` : `http://bot-bazaar.com/reset/${token}`;

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
}

const tokenReset = async (req, res) => {
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
}

const createQuestions = async (req, res) => {
    try {
        const { q1, q1a, q2, q2a, q3, q3a } = req.body;

        if (!q1 || !q1a || !q2 || !q2a || !q3 || !q3a) {
            return res.status(400).json({ error: 'You muster enter all questions and answers' });
        }

        if (!validQuestion(q1) || !validQuestion(q2) || !validQuestion(q3)) {
            return res.status(400).json({ error: 'One or more questions is not valid' });
        }


        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const arr = new Array(3);

        const salt1 = await bcrypt.genSalt(10);
        const hash1 = await bcrypt.hash(q1a, salt1);

        
        const salt2 = await bcrypt.genSalt(10);
        const hash2 = await bcrypt.hash(q2a, salt2);

        const salt3 = await bcrypt.genSalt(10);
        const hash3 = await bcrypt.hash(q3a, salt3);

        arr[0] = {
            question: q1,
            answer: hash1
        };

        arr[1] = {
            question: q2,
            answer: hash2
        };

        arr[2] = {
            question: q3,
            answer: hash3
        };

        user.securityQuestions = arr;

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            q1: updatedUser.securityQuestions[0].question,
            q2: updatedUser.securityQuestions[1].question,
            q3: updatedUser.securityQuestions[2].question
        });

    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const verifyQuestions = async (req, res) => {
    try {
        const { q1, q1a, q2, q2a, q3, q3a, email } = req.body;

        if (!q1 || !q1a || !q2 || !q2a || !q3 || !q3a) {
            return res.status(400).json({ error: 'You muster enter all questions and answers' });
        }

        if (!validQuestion(q1) || !validQuestion(q2) || !validQuestion(q3)) {
            return res.status(400).json({ error: 'One or more questions is not valid' });
        }

        if (!email) {
            return res.status(400).json({ error: 'You must enter an email address.' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (!user.securityQuestions[0]) {
            return res.status(400).json({ error: 'No security questions found' });
        }

        const match1 = await bcrypt.compare(q1a, user.securityQuestions[0].answer);
        const match2 = await bcrypt.compare(q2a, user.securityQuestions[1].answer);
        const match3 = await bcrypt.compare(q3a, user.securityQuestions[2].answer);

        if (!match1 || !match2 || !match3) {
            return res.status(400).json({ error: 'One or more answers do not match' });
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "5m",
        });

        // Might need changed
        const resetLink = process.env.NODE_ENV == 'development' ? `http://localhost:3000/reset/${token}` : `http://bot-bazaar.com/reset/${token}`;

        res.status(200).json({
            success: true,
            resetLink: resetLink
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const validQuestion = (question) => {
    for (const property in SECURITY_QUESTIONS) {
        if (SECURITY_QUESTIONS[property] === question)
            return true;
    }
    return false;
};

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

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    forgotPassword,
    tokenReset,
    createQuestions,
    verifyQuestions,
}