import {
  getProductById,
  listAllProducts,
  getProductByType,
} from '../models/product-model.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await listAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({message: 'Product not found'});
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const ProductByType = async (req, res) => {
  try {
    const products = await getProductByType(req.params.type);
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({message: 'No products found for this type'});
    }
  } catch (error) {
    console.error('Error fetching products by type:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

export {getAllProducts, getProduct, ProductByType};
