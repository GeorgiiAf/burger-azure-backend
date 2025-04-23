import {
  getProductById,
  listAllProducts,
  getProductByType,
  insertProduct,
  removeProductById,
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

const addProduct = async (req, res) => {
  try {
    console.log('addProduct called with body:', req.body); // Debugging log
    const {name, price, description, category} = req.body;
    if (!name || !price || !description || !category) {
      console.log('Validation failed: Missing fields'); // Debugging log
      return res.status(400).json({message: 'All fields are required'});
    }
    const result = await insertProduct({name, price, description, category});
    console.log('Product added successfully with ID:', result.insertId); // Debugging log
    res.status(201).json({
      message: 'Product added successfully',
      productId: result.insertId,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const result = await removeProductById(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'Product not found'});
    }
    res.json({message: 'Product deleted successfully'});
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

export {getAllProducts, addProduct, deleteProduct, getProduct, ProductByType};
