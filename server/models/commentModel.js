const mongoose = require('mongoose');
const { ROLE} = require('../constants/constants.js');

const commentSchema = new mongoose.Schema(
    {
      date: {
        type: Date,
        default: Date.now,
      },
      commenter: {
        type: String,
        default: ROLE.Admin,
        enum: [ROLE.Admin, ROLE.Merchant,ROLE.Member]
      },
      comment: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );
  module.exports = commentSchema;