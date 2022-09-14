import { User } from '@chapp/server/models/UserModel';
import axios from 'axios';
import { API } from '../Api';

interface GetUserByIdModel {
  userId: string;
}

interface GetUserByIdResult {
  user: User;
}

export const getUserById = async (model: GetUserByIdModel) => {
  return axios.get<string, GetUserByIdResult>(
    `${API}/users/get-user/${model.userId}`
  );
};
