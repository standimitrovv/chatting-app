import { HttpError } from '../../models/ErrorModel';
import {
  DirectMessageModel,
  DirectMessage,
} from '../../models/DirectMessageModel';

export const getAllDirectMessagesInteractor = async (
  conversationId: string
) => {
  return DirectMessageModel.find({
    conversationId,
  });
};
