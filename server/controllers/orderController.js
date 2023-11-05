const { PAYMENT_STATUS, STATUS } = require('../constants/constants.js');
const Order = require('../models/orderModel.js');

const getOrders = async (req, res) => {
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

  const count = await Order.count({ ...keyword });
  const orders = await Order.find({ ...keyword })
    .populate("user")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  console.log("orders:",JSON.stringify(orders));
  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
};
//TODO:This is hardcoded at the moment - should be rewritten to actually create orders
const createOrder = async (req, res) => {
  const { orderItems, customerAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    dbOrderItems = [{
      name:'TEST-123',
      price:100
    }]

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      customerAddress,
      paymentMethod,
      itemsPrice: 1000,
      taxPrice:2000,
      totalPrice:3000,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
};
const getCount = async (req,res) => {
  count = await Order.countDocuments();
  res.status(200).json(count);
}

const processRefund = async(req,res) =>{
  try{
    // get the order
    // check if refund can be issued
    //return a success by sending 200
    // need to handle refund method from payments side
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
      if(!order.isRefundIssued){
        order.paymentStatus = PAYMENT_STATUS.RefundInitiated
        //TODO: Have to call the payment refund method from the payment service
        refundStatus = true
        order.paymentStatus = PAYMENT_STATUS.RefundProcessing
        if(refundStatus){
          order.isRefundIssued = true;
          order.paymentStatus = PAYMENT_STATUS.Refunded;
          order.status = STATUS.Cancelled;
          const updatedOrder = await order.save();
          res.status(200).json({updatedOrder}); //Return the updated order
        }
        else{
          
          order.isRefundIssued = false
          order.paymentStatus = PAYMENT_STATUS.RefundFailed
          const updatedOrder = await order.save();
          throw new Error('Error occurred while processing refund.')
        }
      }
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  }
  catch(error){
    res.status(500).json({
      error: 'Unable to process refunds.',
    });
  }
}
module.exports=  {
  createOrder,
  getOrders,
  getCount,
  processRefund
};