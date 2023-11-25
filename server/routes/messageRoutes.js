const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')

const { addMessage, getMessages, getContacts } = require('../controllers/messagesController.js')

router.route('/add-message').post(auth, addMessage)
router.route('/get-messages').get(auth, getMessages)
router.route('/get-contacts').get(auth, getContacts)

module.exports = router;