import { ConversationModel } from '../../models/ConversationModel';

export const checkForExistingConversationInteractor = async (
  members: [string, string]
) => {
  const existingConversation = await ConversationModel.findOne({ members });

  return !!existingConversation;
};
