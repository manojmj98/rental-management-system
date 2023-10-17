const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const nodemailer = require('nodemailer');
const { EMAIL_PROVIDER } = require('../constants/constants.js');
const { googleOauthHandler,registerUser, loginUser, logoutUser, resetPassword, forgotPassword, tokenReset, createQuestions, verifyQuestions, getQuestions } = require('../controllers/authController.js')

// Register new user
router.post('/register', registerUser);
// Authentication
router.post('/login',loginUser);
// Delete JWT cookie
router.post('/logout', logoutUser);
router.put('/reset', auth, resetPassword);
router.post("/forgot", forgotPassword);
router.put('/reset/:token', tokenReset);
router.put('/question', auth, createQuestions);
router.post('/question', verifyQuestions);
router.get('/question', getQuestions);

router.post('/google',googleOauthHandler);

module.exports = router;