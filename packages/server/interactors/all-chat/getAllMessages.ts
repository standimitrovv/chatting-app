import {
  AllChatMessage,
  AllChatMessageModel,
} from '../../models/AllChatMessageModel';
import { HttpError } from '../../models/ErrorModel';

export const getAllMessages = async () => {
  try {
    const result: AllChatMessage[] = await AllChatMessageModel.find();

    if (!result || result.length === 0) {
      throw new HttpError('No messages found', 200);
    }

    return result;
  } catch (err) {
    throw new HttpError('Something went wrong,please try again later', 500);
  }
};
