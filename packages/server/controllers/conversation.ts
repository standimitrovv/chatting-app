import { Request, Response, NextFunction } from 'express';

import { ConversationModel } from '../models/conversation';
import { MessageModel } from '../models/message';
import { HttpError } from '../models/error';
import { saveConversation } from '../service/conversation/saveConversation';

export const createConvo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, friendId } = req.body;

  try {
    const createdConversation = saveConversation(userId, friendId);

    res.json({
      message: 'Successfully created a new conversation',
      conv: createdConversation,
    });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

export const getConvoOfUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    const userConversations = await ConversationModel.find({ userId });
    if (!userConversations || userConversations.length === 0)
      return next(
        new HttpError('User does not have any existing conversations', 401)
      );
    res.json({ userConversations });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

export const deleteConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const conversationId = req.params.convoId;
  try {
    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation) {
      return next(
        new HttpError('No conversation found for corresponding id', 400)
      );
    }
    await MessageModel.deleteMany({ conversationId });
    await ConversationModel.deleteOne({ _id: conversationId });
    res.json({ message: 'Successfully deleted conversation' });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};
