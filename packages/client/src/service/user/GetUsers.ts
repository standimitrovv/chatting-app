import { User } from '@chapp/server/models/UserModel';
import axios from 'axios';
import { API } from '../Api';

interface GetUsersResult extends User {}

export const getUsers = async () => {
  return axios.get<string, GetUsersResult[]>(`${API}/users/get-users`);
};

export const getAllUsersExceptCurrentOne = async (userId: string) => {
  const users = await getUsers();

  return users.filter((user) => user.userId !== userId);
};
