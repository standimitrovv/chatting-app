import { Request, Response, NextFunction } from 'express';

import { MessageModel } from '../models/message';
import { HttpError } from '../models/error';
import { io } from '../socket';

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { conversationId, sender, text, createdAt } = req.body;
  try {
    const createdMessage = new MessageModel({
      conversationId,
      sender,
      text,
      createdAt,
    });

    try {
      await createdMessage.save();
    } catch (err) {
      const error = new HttpError(
        'Creating message failed, please try again.',
        500
      );
      return next(error);
    }
    io.getIO().emit('message', { action: 'create', createdMessage });
    res.json({ message: 'Successfully created a message', createdMessage });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

exports.getConvoMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const convoId = req.params.convoId;
  try {
    const messages = await MessageModel.find({
      conversationId: convoId,
    });
    if (!messages || messages.length === 0)
      return next(
        new HttpError('No messages found for the current conversation', 400)
      );
    res.json({ messages });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};
