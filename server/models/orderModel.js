const mongoose = require("mongoose");
const { PAYMENT_STATUS, STATUS} = require('../constants/constants.js');
//TODO: Think about the items that are absolutely necessary for an order and 
//make them required
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: false },
        qty: { type: Number, required: false },
        image: { type: String, required: false },
        price: { type: Number, required: false },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: 'Product',
        },
      },
    ],
    customerAddress: {
      address: { type: String, required: false},
      city: { type: String, required: false },
      postalCode: { type: String, required: false },
      country: { type: String, required: false },
    },
    pickupAddress: {
        address: { type: String, required: false },
        city: { type: String, required: false },
        postalCode: { type: String, required: false },
        country: { type: String, required: false },
      },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: false,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: false,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: false,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    status:{
        type: String,
        default: STATUS.Initial,
        enum: [STATUS.Completed,STATUS.Delivered,STATUS.Processing,STATUS.Initial,STATUS.Cancelled]
    },
    paymentStatus:{
        type: String,
        default: PAYMENT_STATUS.Processing,
        enum:[PAYMENT_STATUS.Completed,PAYMENT_STATUS.Processing,PAYMENT_STATUS.RefundInitiated,
          PAYMENT_STATUS.RefundProcessing,PAYMENT_STATUS.RefundFailed,PAYMENT_STATUS.Refunded]
    },
    isRefundIssued:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
