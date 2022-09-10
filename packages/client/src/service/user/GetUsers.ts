import { User } from '@chapp/server/models/user';
import axios from 'axios';
import { API } from '../Api';

interface GetUsersResult extends User {}

export const getUsers = async () => {
  return await axios.get<string, GetUsersResult[]>(`${API}/users/get-users`);
};
