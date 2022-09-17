import { UserModel } from '../../models/UserModel';

export const getUserByIdInteractor = async (userId: string) => {
  return UserModel.findOne({ userId });
};
