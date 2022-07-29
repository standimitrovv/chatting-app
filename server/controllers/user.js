const User = require('../models/user');
const HttpError = require('../models/error');
const io = require('../socket');

exports.createUser = (req, res, next) => {
  const email = req.body.email;
  const fullName = req.body.fullName;
  const photoUrl = req.body.photoUrl;
  const userId = req.body.userId;

  User.findOne({ userId })
    .then((user) => {
      if (!user) {
        const user = new User({ email, fullName, photoUrl, userId });
        return user
          .save()
          .then((result) => {
            if (!result) throw new HttpError('Could not save the user', 400);
            else return res.status(201).json({ message: 'User created!' });
          })
          .catch((err) => {
            throw new HttpError('Something went wrong', 500);
          });
      }
    })
    .catch((error) => {
      throw new HttpError('Something went wrong, please try again later!', 500);
    });
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return next(new HttpError('No users found', 400));
    }
    res.json({ users });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

exports.getSingleUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ userId });
    if (!user || user.length === 0) {
      return next(new HttpError('No user found', 400));
    }
    res.json({ user });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const userId = req.params;

  const status = req.query.status;

  let user;
  try {
    user = await User.findOne(userId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }

  if (!user || user.length === 0) {
    return next(new HttpError('No user found', 400));
  }

  user.status = status;

  try {
    await user.save();
  } catch (err) {
    new HttpError('Something went wrong, please try again later!', 500);
  }

  io.getIO().emit('status-change');

  res.json({ message: 'Status Updated!' });
};
