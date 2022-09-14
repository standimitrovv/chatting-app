import axios from 'axios';
import { API } from '../Api';

interface SaveUserModel {
  email: string;
  fullName: string;
  photoUrl: string;
  userId: string;
}

interface SaveUserResult {
  message: string;
}

export const saveUser = async (model: SaveUserModel) => {
  return axios.post<string, SaveUserResult>(`${API}/users/create-user`, {
    model,
  });
};
