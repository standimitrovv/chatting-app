import { Request, Response } from 'express';
import { io } from '../app';
import { getAllMessagesInteractor } from '../interactors/all-chat/GetAllMessagesInteractor';
import { saveMessageInteractor } from '../interactors/all-chat/SaveMessageInteractor';
import { deleteMessageByIdInteractor } from '../interactors/all-chat/DeleteMessageByIdInteractor';

export const createMessage = async (req: Request, res: Response) => {
  const { text, usersName, usersImageUrl, dateOfSending, creator } = req.body;

  try {
    const result = await saveMessageInteractor(
      text,
      usersName,
      usersImageUrl,
      dateOfSending,
      creator
    );

    // io.emit('messages', { action: 'create', result });

    res.status(201).json({ message: 'Message created' });
  } catch (err) {}
};

export const getMessages = async (_: unknown, res: Response) => {
  try {
    const result = await getAllMessagesInteractor();

    // io.emit('messages', { action: 'get', result });

    res.status(201).json({ message: 'Fetched Successfully!', result });
  } catch (err) {}
};

export const deleteMessage = async (req: Request, res: Response) => {
  const messageId = req.params.messageId;

  try {
    const result = await deleteMessageByIdInteractor(messageId);

    // io.emit('messages', { action: 'delete', result });

    res.status(200).json({ message: 'Deleted successfuly' });
  } catch (err) {}
};
