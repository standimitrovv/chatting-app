const io = require('../socket');
import { Request, Response } from 'express';

import { AllChatMessageModel } from '../models/allChatMessage';
import { HttpError } from '../models/error';

export const createMessage = async (req: Request, res: Response) => {
  const { text, usersName, usersImageUrl, dateOfSending, creator } = req.body;

  const message = new AllChatMessageModel({
    text,
    usersName,
    usersImageUrl,
    dateOfSending,
    creator,
  });

  try {
    const result = await message.save();

    io.getIO().emit('messages', { action: 'create', result });

    res.status(201).json({ message: 'Message created' });
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};

export const getMessages = async (_: unknown, res: Response) => {
  try {
    const result = await AllChatMessageModel.find();

    if (!result || result.length === 0) {
      return res.status(200).json({ message: 'No messages found' });
    }

    io.getIO().emit('messages', { action: 'get', result });

    res.status(201).json({ message: 'Fetched Successfully!', result });
  } catch (err) {
    throw new HttpError('Something went wrong,please try again later', 500);
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const messageId = req.params.messageId;

  try {
    const result = await AllChatMessageModel.findById(messageId);

    if (!result) {
      return res.status(200).json({ message: 'No message found' });
    }

    io.getIO().emit('messages', { action: 'delete', result });

    res.status(200).json({ message: 'Deleted successfuly' });
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
