import { HttpError } from '../../models/error';
import { MessageModel, Message } from '../../models/message';

export const getAllConversationMessages = async (conversationId: string) => {
  try {
    const messages: Message[] = await MessageModel.find({
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
