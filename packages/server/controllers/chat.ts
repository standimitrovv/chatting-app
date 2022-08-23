import { Request, Response } from 'express';
import { io } from '../socket';
import { getAllMessages } from '../service/all-chat/getAllMessages';
import { saveMessage } from '../service/all-chat/saveMessage';
import { deleteMessageById } from '../service/all-chat/deleteMessageById';

export const createMessage = async (req: Request, res: Response) => {
  const { text, usersName, usersImageUrl, dateOfSending, creator } = req.body;

  try {
    const result = await saveMessage(
      text,
      usersName,
      usersImageUrl,
      dateOfSending,
      creator
    );

    io.emit('messages', { action: 'create', result });

    res.status(201).json({ message: 'Message created' });
  } catch (err) {}
};

export const getMessages = async (_: unknown, res: Response) => {
  try {
    const result = await getAllMessages();

    io.emit('messages', { action: 'get', result });

    res.status(201).json({ message: 'Fetched Successfully!', result });
  } catch (err) {}
};

export const deleteMessage = async (req: Request, res: Response) => {
  const messageId = req.params.messageId;

  try {
    const result = await deleteMessageById(messageId);

    io.emit('messages', { action: 'delete', result });

    res.status(200).json({ message: 'Deleted successfuly' });
  } catch (err) {}
};
