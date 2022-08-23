import { AllChatMessageModel } from '../../models/allChatMessage';
import { HttpError } from '../../models/error';

export const getAllMessages = async () => {
  try {
    const result = await AllChatMessageModel.find();

    if (!result || result.length === 0) {
      throw new HttpError('No messages found', 200);
    }

    return result;
  } catch (err) {
    throw new HttpError('Something went wrong,please try again later', 500);
  }
};
