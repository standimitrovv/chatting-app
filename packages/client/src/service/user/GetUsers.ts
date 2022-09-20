import { User } from '@chapp/server/models/UserModel';
import axios from 'axios';
import { API } from '../Api';

interface GetUsersResult {
  users: User[];
}

export const getUsers = async () => {
  return axios.get<GetUsersResult>(`${API}/users/get-users`);
};

export const getAllUsersExceptCurrentOne = async (userId: string) => {
  const { data } = await getUsers();

  return data.users.filter((u) => u.userId !== userId);
};
