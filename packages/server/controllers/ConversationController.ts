import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../models/ErrorModel';
import { saveConversation } from '../service/conversation/SaveConversation';
import { getAllUserConversationsById } from '../service/conversation/GetAllUserConversationsById';
import { deleteConversation } from '../service/conversation/DeleteConversation';

export const onSaveConversation = async (
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

export const onGetAllUserConversationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    const userConversations = await getAllUserConversationsById(userId);

    res.json({ userConversations });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

export const onDeleteConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const conversationId = req.params.convoId;
  try {
    await deleteConversation(conversationId);

    res.json({ message: 'Successfully deleted conversation' });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};
