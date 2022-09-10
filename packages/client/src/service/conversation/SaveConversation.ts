import axios from 'axios';
import { UserConversation } from '../../start-page/models/UserConversation';
import { API } from '../Api';

interface SaveConversationModel {
  userId: string;
  friendId: string;
}

interface SaveConversationResult {
  message: string;
  conv: UserConversation;
}

export const saveConversation = async (model: SaveConversationModel) => {
  return await axios.post<string, SaveConversationResult>(
    `${API}/conversations/create-convo`,
    model
  );
};
