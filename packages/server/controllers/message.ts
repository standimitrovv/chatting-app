import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../models/error';
import { io } from '../socket';
import { saveMessage } from '../service/message/saveMessage';
import { getAllConversationMessages } from '../service/message/getAllConversationMessages';

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { conversationId, sender, text, createdAt } = req.body;

  try {
    const createdMessage = await saveMessage(
      conversationId,
      sender,
      text,
      createdAt
    );

    io.emit('message', { action: 'create', createdMessage });

    res.json({ message: 'Successfully created a message', createdMessage });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

export const getConvoMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const convoId = req.params.convoId;
  try {
    const messages = await getAllConversationMessages(convoId);

    res.json({ messages });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};
