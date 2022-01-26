const Message = require('../model/message');
const io = require('../socket');

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
      io.getIO().emit('messages', { action: 'create', result });
      res.status(201).json({ message: 'message created' });
    })
    .catch((err) => {
      console.error('error when saving the message');
    });
};

exports.getMessages = (req, res, next) => {
  Message.find()
    .then((result) => {
      io.getIO().emit('messages', { action: 'get', result });
      res.status(201).json({ message: 'Fetched Successfully!', result });
    })
    .catch((err) => console.error(err));
};

exports.deleteMessage = (req, res, next) => {
  const messageId = req.params.messageId;
  Message.findById(messageId)
    .then((message) => {
      if (!message) throw new Error('No message found');
      else return Message.findByIdAndRemove(messageId);
    })
    .then((result) => {
      io.getIO().emit('messages', { action: 'delete', result });
      res.status(200).json({ message: 'Deleted successfully' });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
