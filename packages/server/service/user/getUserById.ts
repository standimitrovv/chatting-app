import { UserModel } from '../../models/user';
import { HttpError } from '../../models/error';

export const getUserById = async (userId: string) => {
  try {
    const user = await UserModel.findOne({ userId });

    if (!user) {
      throw new HttpError('No user found', 200);
    }

    return user;
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
