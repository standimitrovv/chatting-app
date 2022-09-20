import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../models/ErrorModel';
import { saveConversationInteractor } from '../interactors/conversation/SaveConversationInteractor';
import { getAllUserConversationsByIdInteractor } from '../interactors/conversation/GetAllUserConversationsByIdInteractor';
import { deleteConversationInteractor } from '../interactors/conversation/DeleteConversationInteractor';
import { checkForExistingConversationInteractor } from '../interactors/conversation/CheckForExistingConversationInteractor';

interface RequestBody {
  userId: string;
  friendId: string;
}

export const onSaveConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, friendId } = req.body as RequestBody;

  const members: [string, string] = [userId.toString(), friendId.toString()];

  try {
    const doesConversationAlreadyExist =
      await checkForExistingConversationInteractor(members);

    if (doesConversationAlreadyExist) {
      return res.status(200).json({ message: 'Conversation already exists!' });
    }

    const createdConversation = await saveConversationInteractor(members);

    res.json({
      message: 'Successfully created a new conversation',
      conversation: createdConversation,
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
    const userConversations = await getAllUserConversationsByIdInteractor(
      userId
    );

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
    await deleteConversationInteractor(conversationId);

    res.json({ message: 'Successfully deleted conversation' });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};
