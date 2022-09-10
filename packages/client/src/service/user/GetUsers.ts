import { User } from '@chapp/server/models/user';
import axios from 'axios';
import { API } from '../Api';

export const getUsers = async () => {
  return await axios.get<string, User[]>(`${API}/users/get-users`);
};
