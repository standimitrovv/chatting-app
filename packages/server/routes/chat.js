const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chat');

router.post('/create-message', chatController.createMessage);

router.get('/get-messages', chatController.getMessages);

router.delete('/delete-message/:messageId', chatController.deleteMessage);

module.exports = router;
