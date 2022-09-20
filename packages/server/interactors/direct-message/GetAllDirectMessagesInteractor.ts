import { DirectMessageModel } from '../../models/DirectMessageModel';

export const getAllDirectMessagesInteractor = async (
  conversationId: string
) => {
  return DirectMessageModel.find({
    conversationId,
  });
};
