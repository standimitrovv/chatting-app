import { AllChatMessageModel } from '../../models/allChatMessage';
import { HttpError } from '../../models/error';

export const deleteMessageById = async (messageId: string) => {
  try {
    const result = await AllChatMessageModel.findById(messageId);

    if (!result) {
      throw new HttpError('No message found', 200);
    }

    return result;
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
