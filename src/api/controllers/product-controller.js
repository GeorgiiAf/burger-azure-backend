import {
  getProductById,
  listAllProducts,
  getProductByType,
  insertProduct,
  removeProductById,
  updateProductById,
  addAllergyToProduct,
  removeAllergyFromProduct,
  getAllergiesByProductId,
  getAllergyByName,
  createAllergy,
  getAllAllergies,
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
    console.log('addProduct called with body:', req.body);
    const {name, price, description, category} = req.body;
    if (!name || !price || !description || !category) {
      console.log('Validation failed: Missing fields');
      return res.status(400).json({message: 'All fields are required'});
    }
    const result = await insertProduct({name, price, description, category});
    console.log('Product added successfully with ID:', result.insertId);
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

const updateProduct = async (req, res) => {
  try {
    console.log('updateProduct called with body:', req.body);
    const {id} = req.params;

    // Remove any undefined or null values from the body
    const updateData = Object.fromEntries(
      Object.entries(req.body).filter(([_, v]) => v != null)
    );

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({message: 'No valid fields provided for update'});
    }

    const result = await updateProductById(id, updateData);
    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'Product not found'});
    }

    console.log('Product updated successfully with ID:', id);
    res.json({message: 'Product updated successfully'});
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

//Allergies:

// Create a new allergy
const addAllergy = async (req, res) => {
  try {
    const {name} = req.body;

    if (!name) {
      return res.status(400).json({message: 'Allergy name is required'});
    }

    // Check if allergy already exists
    const existingAllergy = await getAllergyByName(name);
    if (existingAllergy) {
      return res.status(400).json({message: 'Allergy already exists'});
    }

    await createAllergy(name);
    res.status(201).json({message: 'Allergy added successfully'});
  } catch (error) {
    console.error('Error adding allergy:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

// Get all allergies
const listAllergies = async (req, res) => {
  try {
    const allergies = await getAllAllergies();
    res.json(allergies);
  } catch (error) {
    console.error('Error fetching allergies:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

// Add allergy to product
const addProductAllergy = async (req, res) => {
  try {
    const {id: productId} = req.params;
    const {allergyId} = req.body;

    if (!allergyId) {
      return res.status(400).json({message: 'allergyId is required'});
    }

    await addAllergyToProduct(productId, allergyId);
    res.status(201).json({message: 'Allergy added to product'});
  } catch (error) {
    console.error('Error in addProductAllergy:', error);

    // Handle specific error cases
    if (error.message === 'Product not found') {
      return res.status(404).json({message: error.message});
    }
    if (error.message === 'Allergy not found') {
      return res.status(404).json({message: error.message});
    }
    if (error.message === 'Allergy already assigned to product') {
      return res.status(400).json({message: error.message});
    }

    res.status(500).json({message: 'Internal server error'});
  }
};

// Remove allergy from product
const removeProductAllergy = async (req, res) => {
  try {
    const {id: productId} = req.params; // Get productId from URL params
    const {allergyId} = req.body; // Get allergyId from request body

    if (!allergyId) {
      return res.status(400).json({message: 'allergyId is required'});
    }

    await removeAllergyFromProduct(productId, allergyId);
    res.json({message: 'Allergy removed from product successfully'});
  } catch (error) {
    console.error('Error removing allergy from product:', error);

    if (error.message === 'Allergy not found for this product') {
      return res.status(404).json({message: error.message});
    }

    res.status(500).json({message: 'Internal server error'});
  }
};

// Get allergies for a product
const getProductAllergies = async (req, res) => {
  try {
    const {id} = req.params;
    const allergies = await getAllergiesByProductId(id);

    res.json(allergies);
  } catch (error) {
    console.error('Error fetching product allergies:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

export {
  getAllProducts,
  addProduct,
  deleteProduct,
  getProduct,
  ProductByType,
  updateProduct,
  getProductAllergies,
  addProductAllergy,
  removeProductAllergy,
  listAllergies,
  addAllergy,
};
