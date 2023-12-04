
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

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const payOrder=async (req,res) => {
  const {amount, token } = req.body;
  try{
  const customer=await stripe.customers.create({
    name:req.user.name,
    email: req.user.email,
  });
  res.status(200).send(customer);
}catch(error){
  console.error(err);
    res.status(500).send('Customer does not exist');
}
  try {
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source: token.id,
      description: 'Payment',
    });

    res.send('Payment successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Payment failed');
  }
}
module.exports=  {
  createOrder,
  getOrders,
  getCount, 
  payOrder
};