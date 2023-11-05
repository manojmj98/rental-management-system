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
      enum: [ROLE.Admin, ROLE.Merchant]
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

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    comments:[commentSchema],
    tags: {
      type: [String],
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
