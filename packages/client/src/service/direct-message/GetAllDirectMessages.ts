import axios from 'axios';
import { DirectMessage } from '@chapp/server/models/DirectMessageModel';

import { API } from '../Api';

interface GetAllDirectMessagesModel {
  conversationId: string;
}

interface GetAllDirectMessagesResult {
  message?: string;
  messages?: DirectMessage[];
}

export const getAllDirectMessages = async (
  model: GetAllDirectMessagesModel
) => {
  return axios.get<GetAllDirectMessagesResult>(
    `${API}/direct-messages/get-messages/${model.conversationId}`
  );
};
