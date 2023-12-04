
const Order = require('../models/orderModel.js');

const getOrders = async (req, res) => {
console.log("Inside getproducts call");
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



module.exports=  {
  createOrder,
  getOrders,
  getCount, 
};