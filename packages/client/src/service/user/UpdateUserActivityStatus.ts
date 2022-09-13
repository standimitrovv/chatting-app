import axios from 'axios';
import { AvailableUserStatuses } from '../../app/models/AvailableUserStatuses';
import { API } from '../Api';

interface UpdateUserActivityStatusModel {
  userId: string;
  status: AvailableUserStatuses;
}

interface UpdateUserActivityStatusResult {
  message: string;
}

export const updateUserActivityStatus = async (
  model: UpdateUserActivityStatusModel
) => {
  return await axios.patch<string, UpdateUserActivityStatusResult>(
    `${API}/users/update-user-status/${model.userId}
  `,
    { status: model.status }
  );
};
