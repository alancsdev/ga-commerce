import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
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

export { getProducts, getProductById, createProduct, updateProduct };
