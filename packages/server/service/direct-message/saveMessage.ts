import { MessageModel } from '../../models/DirectMessageModel';
import { HttpError } from '../../models/ErrorModel';

export const saveMessage = async (
  conversationId: string,
  sender: string,
  text: string,
  createdAt: Date
) => {
  const message = new MessageModel({
    conversationId,
    sender,
    text,
    createdAt,
  });

  try {
    return await message.save();
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
