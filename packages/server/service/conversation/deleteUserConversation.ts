import { ConversationModel } from '../../models/conversation';
import { HttpError } from '../../models/error';
import { MessageModel } from '../../models/message';

export const deleteUserConversation = async (conversationId: string) => {
  try {
    const conversation = await ConversationModel.findById(conversationId);

    if (!conversation) {
      throw new HttpError('No conversation found for corresponding id', 200);
    }

    await MessageModel.deleteMany({ conversationId });

    await ConversationModel.deleteOne({ _id: conversationId });
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
