import { HttpError } from '../../models/ErrorModel';
import {
  DirectMessageModel,
  DirectMessage,
} from '../../models/DirectMessageModel';

export const getAllDirectMessagesInteractor = async (
  conversationId: string
) => {
  try {
    const messages: DirectMessage[] = await DirectMessageModel.find({
      conversationId,
    });

    if (messages.length === 0) {
      throw new HttpError('No messages found for specified id', 200);
    }

    return messages;
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
