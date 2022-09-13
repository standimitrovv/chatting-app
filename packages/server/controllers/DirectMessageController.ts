import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../models/ErrorModel';
import { io } from '../socket';
import { saveDirectMessageInteractor } from '../interactors/direct-message/SaveDirectMessageInteractor';
import { getAllDirectMessagesInteractor } from '../interactors/direct-message/GetAllDirectMessagesInteractor';

export const onSaveDirectMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { conversationId, sender, text, createdAt } = req.body;

  try {
    const createdMessage = await saveDirectMessageInteractor(
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

export const onGetAllDirectMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const convoId = req.params.convoId;
  try {
    const messages = await getAllDirectMessagesInteractor(convoId);

    res.json({ messages });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};
