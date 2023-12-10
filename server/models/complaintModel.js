const mongoose = require("mongoose");
const { COMPLAINT_STATUS } = require("../constants/constants");
const User = require("../models/userModel.js");
const commentSchema = require('./commentModel.js');

const complaintSchema = mongoose.Schema(
  {
    description: {
        type:String,
        required: true,
    },
    comments:[commentSchema],
    orderId:{
       type:String,
       required:true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //Info of user who is raising the complaint
        required: true
    },
    preferredCommunication:{
        type: String,
        required: false,
    },
    prefferredCommunicationMethodDetails: {
      type:String, //field for storing email / phone
      required: false
    },
    complaintStatus: {
        type: String,
        default: COMPLAINT_STATUS.Created,
        enum: [COMPLAINT_STATUS.Complete,COMPLAINT_STATUS.Created,COMPLAINT_STATUS.Investigation,
          COMPLAINT_STATUS.RefundIssued,COMPLAINT_STATUS.WithOwner,COMPLAINT_STATUS.Accepted,COMPLAINT_STATUS.Denied]
    }
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;