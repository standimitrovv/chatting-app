const Conversation = require('../models/conversation');
const Message = require('../models/message');
const HttpError = require('../models/error');

exports.createConvo = async (req, res, next) => {
  const { userId, friendId } = req.body;
  try {
    const existingConvo = await Conversation.findOne({
      members: [userId, friendId],
    });
    if (existingConvo) {
      res.json({ message: 'Conversation already exists', existingConvo });
      return next(new HttpError('Conversation already exists', 400));
    }
    const createdConvo = new Conversation({
      members: [userId, friendId],
    });
    await createdConvo.save();
    res.json({
      message: 'Successfully created a new conversation',
      conv: createdConvo,
    });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

exports.getConvoOfUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const userConversations = await Conversation.find({ userId });
    if (!userConversations || userConversations.length === 0)
      return next(
        new HttpError('User does not have any existing conversations', 401)
      );
    res.json({ userConversations });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};

exports.deleteConversation = async (req, res, next) => {
  const conversationId = req.params.convoId;
  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return next(
        new HttpError('No conversation found for corresponding id', 400)
      );
    }
    await Message.deleteMany({ conversationId });
    await Conversation.deleteOne({ _id: conversationId });
    res.json({ message: 'Successfully deleted conversation' });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, please try again later!', 500)
    );
  }
};
