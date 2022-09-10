import { Message } from '@chapp/server/models/DirectMessageModel';
import axios from 'axios';
import { API } from '../Api';

interface CreateConversationMessageModel {
  conversationId: string;
  sender: string;
  text: string;
  createdAt: Date;
}

interface CreateConversationMessageResult {
  message: string;
  createdMessage: Message;
}

export const createConversationMessage = async (
  message: CreateConversationMessageModel
) => {
  await axios.post<CreateConversationMessageResult>(
    `${API}/messages/create-message`,
    {
      message,
    }
  );
};
