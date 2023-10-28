const mongoose = require("mongoose");
const { COMPLAINT_STATUS } = require("../constants/constants");

const complaintSchema = mongoose.Schema(
  {
    description: {
        type:String,
        required: true,
    },
    comments:{
        type:String,
    },
    orderId:{
       type:String,
       required:true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //Info of user who is raising the complaint
        required: true
    },
    complaintStatus: {
        type: String,
        default: COMPLAINT_STATUS.Created,
        enum: [COMPLAINT_STATUS.Complete,COMPLAINT_STATUS.Created,COMPLAINT_STATUS.Investigation,COMPLAINT_STATUS.RefundIssued,COMPLAINT_STATUS.WithOwner]
    }
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;