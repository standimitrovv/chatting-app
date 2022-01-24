const User = require('../model/user');

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
            return res.status(201).json({ message: 'User created!' });
          })
          .catch((err) => {
            err.statusCode = 405;
            throw err;
          });
      }
    })
    .catch((error) => {
      throw new Error('Couldnt create user profile');
    });
};
