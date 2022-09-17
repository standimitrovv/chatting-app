import { UserModel } from '../../models/UserModel';

export const updateUserActivityStatusInteractor = async (
  userId: string,
  status: string
) => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    return;
  }

  user.status = status;

  await user.save();
};
