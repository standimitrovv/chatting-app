import { Conversation, ConversationModel } from '../../models/conversation';
import { HttpError } from '../../models/error';

export const getUserConversations = async (userId: string) => {
  try {
    const conversations: Conversation[] = await ConversationModel.find({
      userId,
    });

    if (conversations.length === 0) {
      throw new HttpError('User does not have any existing conversations', 200);
    }

    return conversations;
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
