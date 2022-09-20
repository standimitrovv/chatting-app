import { Conversation } from '@chapp/server/models/ConversationModel';
import axios from 'axios';
import { API } from '../Api';

interface GetAllUserConversationsByIdModel {
  userId: string;
}

interface GetAllUserConversationsByIdResult {
  userConversations: Conversation[];
}

export const getAllUserConversationsById = async (
  model: GetAllUserConversationsByIdModel
) => {
  return axios.get<GetAllUserConversationsByIdResult>(
    `${API}/conversations/get-convo/${model.userId}`
  );
};
