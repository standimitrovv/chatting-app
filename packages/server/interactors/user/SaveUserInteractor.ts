import { UserModel } from '../../models/UserModel';
import { HttpError } from '../../models/ErrorModel';

export const saveUserInteractor = async (
  email: string,
  fullName: string,
  photoUrl: string,
  userId: string
) => {
  try {
    const existingUser = await UserModel.findOne({ userId: userId.toString() });

    if (existingUser) {
      throw new HttpError('User already exists', 200);
    }

    const user = new UserModel({
      email,
      fullName,
      photoUrl,
      userId,
    });

    await user.save();
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later!', 500);
  }
};
