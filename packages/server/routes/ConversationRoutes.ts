import express from 'express';

import {
  onSaveConversation,
  onGetAllUserConversationById,
  onDeleteConversation,
} from '../controllers/ConversationController';

export const router = express.Router();

router.post('/create-convo', onSaveConversation);

router.get('/get-convo/:userId', onGetAllUserConversationById);

router.delete('/delete-convo/:convoId', onDeleteConversation);
