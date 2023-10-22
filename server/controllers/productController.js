const Product = require('../models/productModel.js');
const getProducts = async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  console.log("Products:",JSON.stringify(products));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Product.findById(id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch {
    res.status(400).json('Invalid-Id');
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, owner } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: 'Please enter name of the Product' });
    }
    if (!price) {
      return res.status(400).json({ error: 'Please enter the price' });
    }
    if (!description) {
      return res
        .status(400)
        .json({ error: 'Please provide description of the product' });
    }
    if (!owner) {
      return res.status(400).json({ error: 'Unable to process the request' });
    }

    const product = new Product({
      name,
      price,
      description,
      owner,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

const updateProduct = async (req, res) => {
  const { name, price, description, id } = req.body;
  const product = await Product.findById(id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  const product = await Product.findById(id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};
const getCount = async (req,res) => {
  count = await Product.countDocuments();
  console.log("Total products:",count);
  res.status(200).json(count);
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCount
};