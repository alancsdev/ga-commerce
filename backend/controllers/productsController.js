import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(process.env.PAGINATION_LIMIT); // Certifique-se de que é um número

  // Page number in the URL
  const page = Number(req.query.pageNumber) || 1;

  // Regex for searching for products - options to make case insensitive
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  // Aggregate pipeline to get products for the current page, total count, and top 5 products
  const aggregatePipeline = [
    // Match stage to filter products based on keyword
    {
      $match: { ...keyword },
    },
    // Sort stage to get top 5 products by rating
    {
      $sort: { rating: -1 },
    },
    // Group stage to get total count and products
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        products: { $push: '$$ROOT' },
      },
    },
    // Project stage to reshape the output and get topProducts
    {
      $project: {
        _id: 0,
        total: 1,
        products: {
          $slice: ['$products', pageSize * (page - 1), pageSize],
        },
        topProducts: {
          $slice: ['$products', 5],
        },
      },
    },
  ];

  const [result] = await Product.aggregate(aggregatePipeline);

  // Extract total count, products, and topProducts from the result
  const { total, products, topProducts } = result || {
    total: 0,
    products: [],
    topProducts: [],
  };

  res.json({ products, page, pages: Math.ceil(total / pageSize), topProducts });
});

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc Create a product
// @route POST /api/products/
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name || 'Sample name',
    price: req.body.price || 0,
    description: req.body.description || 'Sample description',
    image: req.body.image || '/images/sample.jpg',
    brand: req.body.brand || 'Sample brand',
    category: req.body.category || 'Sample category',
    quantityInStock: req.body.quantityInStock || 0,
    numReviews: 0,
    user: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, quantityInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.quantityInStock = quantityInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc Create a review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((accum, review) => accum + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc Delete a review
// @route DELETE /api/products/:id/reviews/
// @access Private
const deleteProductReview = asyncHandler(async (req, res) => {
  const { productId, reviewId } = req.body;

  try {
    // Remove the review from the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $pull: { reviews: { _id: reviewId } }, // Pull the review by its ID
      },
      { new: true } // Return the updated document
    );

    // Check if the product exists
    if (!updatedProduct) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Calculate the new number of reviews and average rating
    const numReviews = updatedProduct.reviews.length;
    let totalRating = 0;

    if (numReviews > 0) {
      totalRating = updatedProduct.reviews.reduce(
        (accum, review) => accum + review.rating,
        0
      );
      updatedProduct.rating = totalRating / numReviews;
    } else {
      updatedProduct.rating = 0; // Set rating to 0 if there are no reviews
    }

    updatedProduct.numReviews = numReviews;

    // Save the updated product
    await updatedProduct.save();

    // Send success response
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message || 'Server Error' });
  }
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
// const getTopProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({}).sort({ rating: -1 }).limit(5);

//   if (products) {
//     res.status(200).json(products);
//   } else {
//     res.status(404);
//     throw new Error('Resource not found');
//   }
// });

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  deleteProductReview,
  // getTopProducts,
};
