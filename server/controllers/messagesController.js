const Message = require('../models/messageModel');

const addMessage = async (req, res) => {
  try {
    const sender = req.user._id;
    const { recipients } = req.body;
    const usersList = [...recipients, sender];

    const newMessage = await new Message({
      sender,
      users: usersList,
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
      return res.status(400).json({ error: 'Please provide recipients' });
    }

    const usersList = [...recipients.split(','), sender];
    const noDuplicates = usersList.filter(
      (item, index) => usersList.indexOf(item) === index
    );

    const messages = await Message.find({
      users: {
        $all: noDuplicates,
        $size: noDuplicates.length,
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        id: msg._id,
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
    // const sender = req.query.sender;

    result = await Message.aggregate([
      {
        $match: {
          users: sender,
        },
      },
      {
        $unwind: '$users',
      },
      {
        $match: {
          users: { $ne: sender }, // Exclude the specified user from the array
        },
      },
      {
        $group: {
          _id: '$_id',
          distinctUsersInDocument: { $addToSet: '$users' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'distinctUsersInDocument',
          foreignField: '_id',
          as: 'usersWithUsername',
        },
      },
      {
        $group: {
          _id: null,
          distinctUserArrays: { $addToSet: '$usersWithUsername' },
        },
      },
      {
        $project: {
          _id: 0,
          distinctUserArrays: 1,
        },
      },
    ]);

    const userContacts = result[0].distinctUserArrays
    
    let projectedContacts = []
    for (let index = 0; index < userContacts.length; index++) {
      projectedContacts.push(userContacts[index].map((contact) => {
        return {
          id: contact._id.toString(),
          username: contact.username,
        };
      })) 
    }
    
    res.status(200).json({ contacts: projectedContacts });
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
  getContacts,
};
