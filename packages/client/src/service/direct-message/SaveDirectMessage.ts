import { DirectMessage } from '@chapp/server/models/DirectMessageModel';
import axios from 'axios';
import { API } from '../Api';

interface SaveDirectMessageModel {
  conversationId: string;
  sender: string;
  text: string;
  createdAt: Date;
}

interface SaveDirectMessageResult {
  message: string;
  createdMessage: DirectMessage;
}

export const saveDirectMessage = async (model: SaveDirectMessageModel) => {
  return axios.post<SaveDirectMessageResult>(
    `${API}/direct-messages/create-message`,
    {
      ...model,
    }
  );
};
