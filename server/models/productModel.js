const mongoose = require('mongoose');
const { ROLE} = require('../constants/constants.js');
const commentSchema = require('./commentModel.js');
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
