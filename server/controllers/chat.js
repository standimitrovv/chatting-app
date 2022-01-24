const Message = require('../model/message');

exports.createMessage = (req, res, next) => {
  const text = req.body.text;
  const usersName = req.body.usersName;
  const usersImageUrl = req.body.usersImageUrl;
  const dateOfSending = req.body.dateOfSending;
  const creator = req.body.creator;

  const message = new Message({
    text,
    usersName,
    usersImageUrl,
    dateOfSending,
    creator,
  });
  return message
    .save()
    .then((result) => {
      res.status(201).json({ message: 'message created' });
    })
    .catch((err) => console.error(err));
};

exports.getMessages = (req, res, next) => {
  const messages = Message.find()
    .then((result) => {
      return res.status(201).json({ message: 'Fetched Successfully!', result });
    })
    .catch((err) => console.error(err));
  return messages;
};
