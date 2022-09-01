import axios from 'axios';
import { Message } from '@chapp/server/models/message';

import { API } from '../Api';

interface GetConversationMessagesResult {
  messages: Message[];
}

export const getConversationMessages = async (conversationId: string) => {
  try {
    const response = await axios.get<string, GetConversationMessagesResult>(
      `${API}/messages/get-messages/${conversationId}`
    );

    if (!response) {
      return [];
    }

    return response.messages;
  } catch (err) {
    console.error(err);
  }
};
