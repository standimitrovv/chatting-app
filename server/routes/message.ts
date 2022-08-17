import express from 'express';

import { createMessage, getConvoMessages } from '../controllers/message';

export const router = express.Router();

router.post('/create-message', createMessage);

router.get('/get-messages/:convoId', getConvoMessages);
