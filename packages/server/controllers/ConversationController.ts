import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../models/error';
import { saveConversation } from '../service/conversation/saveConversation';
import { getUserConversations } from '../service/conversation/getUserConversations';
import { deleteUserConversation } from '../service/conversation/deleteUserConversation';

export const createConvo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, friendId } = req.body;

  try {
    const createdConversation = await saveConversation(userId, friendId);

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
    const userConversations = await getUserConversations(userId);

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
    await deleteUserConversation(conversationId);

    res.json({ message: 'Successfully deleted conversation' });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};
