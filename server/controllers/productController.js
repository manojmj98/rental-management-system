const Product = require('../models/productModel.js');
const getProducts = async (req, res) => {
  try {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const { keyword, tags } = req.query;

    const tagsArr = tags ? tags.replace(/\s/g, '').split(',') : [];

    const keywordQuery = keyword
      ? {
          $or: [
            {
              name: {
                $regex: keyword,
                $options: 'i',
              },
            },
            {
              tags: {
                // $in: keyword.split(' '),
                $regex: keyword,
                $options: 'i',
              },
            },
            {
              tags: {
                $in: keyword.split(' '),
              },
            },
          ],
        }
      : {};

    const tagsQuery = tags
      ? {
          tags: { $all: tagsArr },
        }
      : {};

    const count = await Product.countDocuments({
      ...keywordQuery,
      ...tagsQuery,
    });

    const products = await Product.find({ ...keywordQuery, ...tagsQuery })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Product.findById(id).populate("owner");
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

// Placeholder, waiting on ratings and transactions to implement proper recommendation system
const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: true }).limit(5);

    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, owner, latitude, longitude } = req.body;
    const imagePath = req.file.path;
    console.log(imagePath)

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
      return res.status(400).json({ error: 'enter owner' });
    }
    if (!longitude || !latitude) {
      return res.status(400).json({ error: 'Please provide your address' });
    }

    const product = new Product({
      name,
      price,
      description,
      owner,
      latitude,
      longitude,
      image: imagePath,
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
  try {
    const { name, price, description, id, stock,comments,isApproved,tags } = req.body;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not fount' });
    }
    const tagsArr = typeof tags === 'string' ? tags.replace(/\s/g, '').split(',') : product.tags;


    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.tags = tagsArr;
    product.stock = stock || product.stock;
    product.comments = comments || product.comments;
    product.isApproved = isApproved;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

const getCount = async (req, res) => {
  count = await Product.countDocuments();
  res.status(200).json(count);
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { id, rating, comment } = req.body;

    const product = await Product.findById(id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getRecommendedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCount,
  createProductReview,
  getTopProducts,
};
