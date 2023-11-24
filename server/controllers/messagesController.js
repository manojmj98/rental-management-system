const Message = require('../models/messageModel');

const addMessage = async (req, res) => {
  try {
    const sender = req.user._id;
    const { recipients } = req.body;
    const users = [...recipients, sender];

    const newMessage = await new Message({
      sender,
      users,
      message: req.body.message,
    }).save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
    console.log(error);
  }
};

const getMessages = async (req, res) => {
  try {
    const sender = req.user._id;
    const { recipients } = req.query;
    const users = [...recipients, sender];

    const messages = await Message.find({
      users: {
        $all: users,
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        from: msg.sender.toString(),
        message: msg.message,
        createdAt: msg.createdAt,
      };
    });

    res.status(200).json(projectedMessages);
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
    console.log(error);
  }
};

module.exports = {
  addMessage,
  getMessages,
};
