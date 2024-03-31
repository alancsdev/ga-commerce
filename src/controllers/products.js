import products from '../products.js';

const productController = {
  index: async (req, res) => {
    res.json(products);
  },
  find: async (req, res) => {
    const product = products.find((product) => product._id === req.params.id);
    res.json(product);
  },
};

export default productController;
