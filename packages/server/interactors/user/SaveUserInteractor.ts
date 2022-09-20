import { UserModel } from '../../models/UserModel';

export const saveUserInteractor = async (
  email: string,
  fullName: string,
  photoUrl: string,
  userId: string
) => {
  const user = new UserModel({
    email,
    fullName,
    photoUrl,
    userId,
    status: 'Online',
  });

  await user.save();
};
