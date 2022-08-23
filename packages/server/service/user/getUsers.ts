import { UserModel } from '../../models/user';
import { HttpError } from '../../models/error';

export const getUsers = async () => {
  try {
    const users = await UserModel.find();

    if (!users || users.length === 0) {
      throw new HttpError('No users found', 200);
    }

    return users;
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later', 500);
  }
};
