const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability:{
        type: Boolean,
        default: true,
    },
    isApproved:{
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;