import axios from 'axios';
import { DirectMessage } from '@chapp/server/models/DirectMessageModel';

import { API } from '../Api';

interface GetConversationMessagesModel {
  conversationId: string;
}

interface GetConversationMessagesResult {
  messages: DirectMessage[];
}

export const getAllDirectMessages = async (
  model: GetConversationMessagesModel
) => {
  const response = await axios.get<string, GetConversationMessagesResult>(
    `${API}/messages/get-messages/${model.conversationId}`
  );

  if (!response) {
    return [];
  }

  return response.messages;
};
