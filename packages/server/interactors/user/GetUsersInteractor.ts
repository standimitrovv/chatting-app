import { User, UserModel } from '../../models/UserModel';
import { HttpError } from '../../models/ErrorModel';

export const getUsersInteractor = async () => {
  try {
    const users: User[] = await UserModel.find();

    if (!users || users.length === 0) {
      throw new HttpError('No users found', 200);
    }

    return users;
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
