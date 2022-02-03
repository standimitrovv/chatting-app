const express = require('express');
const router = express.Router();

const conversationController = require('../controllers/conversation');

router.post('/create-convo', conversationController.createConvo);

router.get('/get-convo/:userId', conversationController.getConvoOfUser);

module.exports = router;
