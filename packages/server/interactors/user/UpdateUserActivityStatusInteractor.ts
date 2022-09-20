import { User, UserStatus } from '../../models/UserModel';

export const updateUserActivityStatusInteractor = async (
  user: User,
  status: UserStatus
) => {
  user.status = status;

  await user.save();
};
