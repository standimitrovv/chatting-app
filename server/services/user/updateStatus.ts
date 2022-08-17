const io = require('../../socket');

import { HttpError } from '../../models/error';
import { UserModel } from '../../models/user';

export const updateStatus = async (userId: string, status: string) => {
  let user;

  try {
    user = await UserModel.findOne({ userId });
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later!', 500);
  }

  if (!user || user.length === 0) {
    throw new HttpError('No user found', 400);
  }

  user.status = status;

  try {
    await user.save();

    io.getIO().emit('status-change');
  } catch (err) {
    throw new HttpError('Something went wrong, please try again later!', 500);
  }
};
