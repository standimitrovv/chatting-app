import { ConversationModel } from '../../models/ConversationModel';
import { HttpError } from '../../models/ErrorModel';

export const saveConversation = async (userId: string, friendId: string) => {
  //validation
  const members = [userId.toString(), friendId.toString()];

  try {
    const existingConversation = await ConversationModel.findOne({ members });

    if (existingConversation) {
      throw new HttpError('Conversation already exists', 200);
    }

    const conversation = new ConversationModel({
      members,
    });

    await conversation.save();

    return conversation;
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
