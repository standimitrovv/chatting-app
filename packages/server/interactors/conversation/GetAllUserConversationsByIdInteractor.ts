import {
  Conversation,
  ConversationModel,
} from '../../models/ConversationModel';

export const getAllUserConversationsByIdInteractor = async (userId: string) => {
  return ConversationModel.find({
    userId,
  });
};
