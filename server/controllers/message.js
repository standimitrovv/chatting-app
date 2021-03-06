const Message = require('../models/message');
const HttpError = require('../models/error');
const io = require('../socket');

exports.createMessage = async (req, res, next) => {
  const { conversationId, sender, text, createdAt } = req.body;
  try {
    const createdMessage = new Message({
      conversationId,
      sender,
      text,
      createdAt,
    });

    try {
      await createdMessage.save();
    } catch (err) {
      const error = new HttpError(
        'Creating message failed, please try again.',
        500
      );
      return next(error);
    }
    io.getIO().emit('message', { action: 'create', createdMessage });
    res.json({ message: 'Successfully created a message', createdMessage });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

exports.getConvoMessages = async (req, res, next) => {
  const convoId = req.params.convoId;
  try {
    const messages = await Message.find({
      conversationId: convoId,
    });
    if (!messages || messages.length === 0)
      return next(
        new HttpError('No messages found for the current conversation', 400)
      );
    res.json({ messages });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};
