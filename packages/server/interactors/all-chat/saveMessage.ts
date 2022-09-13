import { AllChatMessageModel } from '../../models/AllChatMessageModel';
import { HttpError } from '../../models/ErrorModel';

export const saveMessage = async (
  text: string,
  usersName: string,
  usersImageUrl: string,
  dateOfSending: Date,
  creator: string
) => {
  const message = new AllChatMessageModel({
    text,
    usersName,
    usersImageUrl,
    dateOfSending,
    creator,
  });

  try {
    return await message.save();
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
