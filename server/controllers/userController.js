const User = require('../models/userModel.js');

const updatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.email && req.body.email !== user.email) {
      const existingEmail = await User.findOne({ email: req.body.email });

      if (existingEmail) {
        return res
          .status(400)
          .json({ error: 'That email address is already in use.' });
      }
    }

    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

const userProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

const getCount = async (req, res) => {
  try {
    count = await User.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const result = await User.deleteOne(query);
    res.status(200).json('OK');
  } catch (error) {
    res.status(400).json({
      error: 'Unable fetch users now.Please try again',
    });
  }
};

const getUserID = async (req, res) => {
  try {
    const {username, email} = req.query;

    console.log(email);

    if (!username && !email) {
        return res.status(400).json({error: 'You must enter a username or email'})
    }
    let user
    if(username) {
        user = await User.findOne({ username: username });
    }
    else {
        user = await User.findOne({ email: email });
    }

    if(!user) {
        return res.status(400).json({error: 'No user found with this email or username'})
    }

    res.status(200).json({_id: user._id})

  } catch (error) {
    res.status(400).json({
      error: 'Unable fetch users now.Please try again',
    });
  }
};

module.exports = {
  updatedUser,
  userProfile,
  getUsers,
  getCount,
  deleteUser,
  getUserID
};
