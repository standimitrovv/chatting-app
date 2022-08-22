const Message = require('../models/allChat-message');
const io = require('../socket');
const HttpError = require('../models/error');

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

  message
    .save()
    .then((result) => {
      if (!result) throw new HttpError('Could not save the message', 402);
      io.getIO().emit('messages', { action: 'create', result });
      res.status(201).json({ message: 'message created' });
    })
    .catch((err) => {
      throw new HttpError('Something went wrong, please try again later', 500);
    });
};

exports.getMessages = (req, res, next) => {
  Message.find()
    .then((result) => {
      io.getIO().emit('messages', { action: 'get', result });
      res.status(201).json({ message: 'Fetched Successfully!', result });
    })
    .catch((err) => {
      throw new HttpError('Something went wrong,please try again later', 500);
    });
};

exports.deleteMessage = (req, res, next) => {
  const messageId = req.params.messageId;
  Message.findById(messageId)
    .then((message) => {
      if (!message) throw new HttpError('No message found', 402);
      else return Message.findByIdAndRemove(messageId);
    })
    .then((result) => {
      io.getIO().emit('messages', { action: 'delete', result });
      res.status(200).json({ message: 'Deleted successfully' });
    })
    .catch((err) => {
      throw new HttpError('Something went wrong, please try again later', 500);
    });
};
