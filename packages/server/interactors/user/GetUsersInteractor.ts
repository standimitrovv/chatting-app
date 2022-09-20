import { User, UserModel } from '../../models/UserModel';

export const getUsersInteractor = async () => {
  return UserModel.find();
};
