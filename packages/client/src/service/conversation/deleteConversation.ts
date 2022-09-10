import axios from 'axios';
import { API } from '../Api';

interface DeleteConversationResult {
  message: string;
}

export const deleteConversation = async (conversationId: string) => {
  return await axios.delete<string, DeleteConversationResult>(
    `${API}/conversations/delete-convo/${conversationId}`
  );
};
