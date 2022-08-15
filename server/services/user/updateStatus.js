const HttpError = require('../../models/error');
const User = require('../../models/user');
const io = require('../../socket');

module.exports = async (userId, status) => {
  let user;

  try {
    user = await User.findOne(userId);
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
