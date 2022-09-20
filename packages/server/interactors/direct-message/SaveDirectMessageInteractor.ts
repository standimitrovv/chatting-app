import { DirectMessageModel } from '../../models/DirectMessageModel';
import { HttpError } from '../../models/ErrorModel';

export const saveDirectMessageInteractor = async (
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

  await message.save();

  return message;
};
