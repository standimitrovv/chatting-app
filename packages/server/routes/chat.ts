import express from 'express';

import {
  createMessage,
  getMessages,
  deleteMessage,
} from '../controllers/AllChatController';

export const router = express.Router();

router.post('/create-message', createMessage);

router.get('/get-messages', getMessages);

router.delete('/delete-message/:messageId', deleteMessage);
