const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')

const { addMessage, getMessages } = require('../controllers/messagesController.js')

router.route('/add-message').post(auth, addMessage)
router.route('/get-messages').get(auth, getMessages)

module.exports = router;