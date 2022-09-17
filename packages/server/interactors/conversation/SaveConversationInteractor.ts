import { ConversationModel } from '../../models/ConversationModel';

export const saveConversationInteractor = async (members: [string, string]) => {
  const conversation = new ConversationModel({
    members,
  });

  await conversation.save();

  return conversation;
};
