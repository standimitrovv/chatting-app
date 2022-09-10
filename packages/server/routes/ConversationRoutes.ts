import express from 'express';

import {
  createConvo,
  getConvoOfUser,
  deleteConversation,
} from '../controllers/ConversationController';

export const router = express.Router();

router.post('/create-convo', createConvo);

router.get('/get-convo/:userId', getConvoOfUser);

router.delete('/delete-convo/:convoId', deleteConversation);
