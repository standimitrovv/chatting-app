import express from 'express';

import {
  onSaveDirectMessage,
  onGetAllDirectMessages,
} from '../controllers/DirectMessageController';

export const router = express.Router();

router.post('/create-message', onSaveDirectMessage);

router.get('/get-messages/:convoId', onGetAllDirectMessages);
