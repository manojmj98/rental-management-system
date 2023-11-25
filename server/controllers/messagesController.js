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
    const sender = req.user._id.toString();
    const { recipients } = req.query;

    if (!recipients) {
      return res.status(400).json({error: 'Please provide recipients'})
    }

    const usersList = [...recipients.split(','), sender];
  
    console.log(usersList);
    const messages = await Message.find({
      users: {
        $all: usersList,
        $size: usersList.length
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        from: msg.sender.toString(),
        users: msg.users.toString(),
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

const getContacts = async (req, res) => {
  try {
    const sender = req.user._id;

    const contacts = await Message.find({
      users: {
        $in: sender,
      },
    }).distinct('users');

    // const projectedMessages = messages.map((msg) => {
    //   return {
    //     from: msg.sender.toString(),
    //     message: msg.message,
    //     createdAt: msg.createdAt,
    //   };
    // });

    res.status(200).json(contacts);
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
  getContacts
};
