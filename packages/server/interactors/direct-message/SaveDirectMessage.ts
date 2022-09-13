import { DirectMessageModel } from '../../models/DirectMessageModel';
import { HttpError } from '../../models/ErrorModel';

export const saveDirectMessage = async (
  conversationId: string,
  sender: string,
  text: string,
  createdAt: Date
) => {
  const message = new DirectMessageModel({
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
