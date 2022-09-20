import axios from 'axios';
import { API } from '../Api';

interface DeleteConversationModel {
  conversationId: string;
}

interface DeleteConversationResult {
  message: string;
}

export const deleteConversation = async (model: DeleteConversationModel) => {
  return axios.delete<DeleteConversationResult>(
    `${API}/conversations/delete-convo/${model.conversationId}`
  );
};
