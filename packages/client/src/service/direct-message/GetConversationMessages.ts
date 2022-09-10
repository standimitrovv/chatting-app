import axios from 'axios';
import { Message } from '@chapp/server/models/DirectMessageModel';

import { API } from '../Api';

interface GetConversationMessagesModel {
  conversationId: string;
}

interface GetConversationMessagesResult {
  messages: Message[];
}

export const getConversationMessages = async (
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
