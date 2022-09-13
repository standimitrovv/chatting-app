import { User, UserModel } from '../../models/UserModel';
import { HttpError } from '../../models/ErrorModel';

export const getUserByIdInteractor = async (userId: string) => {
  try {
    const user: User | null = await UserModel.findOne({ userId });

    if (!user) {
      throw new HttpError('No user found', 200);
    }

    return user;
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
