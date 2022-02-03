const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');

router.post('/create-message', messageController.createMessage);

router.get('/get-messages/:convoId', messageController.getConvoMessages);

module.exports = router;
