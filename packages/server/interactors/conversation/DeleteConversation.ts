import { ConversationModel } from '../../models/ConversationModel';
import { HttpError } from '../../models/ErrorModel';
import { DirectMessageModel } from '../../models/DirectMessageModel';

export const deleteConversation = async (conversationId: string) => {
  try {
    const conversation = await ConversationModel.findById(conversationId);

    if (!conversation) {
      throw new HttpError('No conversation found for corresponding id', 200);
    }

    await DirectMessageModel.deleteMany({ conversationId });

    await ConversationModel.deleteOne({ _id: conversationId });
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
