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
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    console.log('complaints:', JSON.stringify(complaints));
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
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    const complaint = {
      description: req.description,
      comments: req.comments,
      orderId: req.orderId,
      customer: req.user,
      complaintStatus: COMPLAINT_STATUS.Created,
    };
    const result = await Complaint.insertOne(complaint);
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
    const { id } = req.query;
    const complaint = await Complaint.findById(id);
    if(!complaint){
        res.status(400).json({
            error:"Complaint not found"
        });
    }
    complaint.complaintStatus = req.body.complaintStatus;
    const result = await complaint.save();
  } catch (error) {
    res.status(500).json({
        error: 'Unable to update complaint, Please try again.',
      });
  }
};

module.exports = {
    getComplaints,
    createComplaint,
    updateStatus
}
