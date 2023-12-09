const { COMPLAINT_STATUS } = require('../constants/constants.js');
const Complaint = require('../models/complaintModel.js');
const User = require('../models/userModel.js');

const getComplaints = async (req, res) => {
  try {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const count = await Complaint.count({ ...keyword });
    const complaints = await Complaint.find({ ...keyword })
      .populate("customer")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ complaints, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({
      error: 'Unable to fetch complaints',
    });
  }
};

const createComplaint = async (req, res) => {
  try {
    //create a complaint and insert into db
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    const complaint = {
      description: req.body.description,
      comments: req.body.comments,
      orderId: req.body.orderId,
      customer: req.user,
      complaintStatus: COMPLAINT_STATUS.Created,
      preferredCommunication: req.preferredCommunication,
      prefferredCommunicationMethodDetails: req.prefferredCommunicationMethodDetails
    };
    const result = await Complaint.create(complaint);
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      error: 'Unable to create complaint, Please try again.',
    });
  }
};

const updateStatus = async (req, res) => {
  //update the status of the complaint
  try {
    const { id } = req.body;
    const complaint = await Complaint.findById(id);
    if(!complaint){
        res.status(400).json({
            error:"Complaint not found"
        });
    }
    if( req.body.complaintStatus == 'approved'){
      complaint.complaintStatus = COMPLAINT_STATUS.Accepted;
    }
    else if(req.body.complaintStatus == 'denied'){
      complaint.complaintStatus = COMPLAINT_STATUS.Denied;
    }
    else if(req.body.complaintStatus == 'assginedToOwner'){
      complaint.complaintStatus = COMPLAINT_STATUS.WithOwner
    }
    else if(req.body.complaintStatus == 'toAdmin'){
      complaint.complaintStatus = COMPLAINT_STATUS.WithAdmin
    }
    complaint.comments = req.body.comments;
    const result = await complaint.save();
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({
        error: 'Unable to update complaint, Please try again.',
      });
  }
};
const getComplaintById = async(req,res) =>{
  try {
    const { id } = req.query;
    const complaint = await Complaint.findById(id);
    if (complaint) {
      return res.json(complaint);
    } else {
      res.status(404);
      throw new Error('complaint not found');
    }
  } catch {
    res.status(400).json('Invalid-Id');
  }
}

module.exports = {
    getComplaints,
    createComplaint,
    updateStatus,
    getComplaintById
}
