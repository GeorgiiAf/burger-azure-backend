import promisePool from '../../utils/database.js';

const listAllProducts = async () => {
  const [products] = await promisePool.execute(
    'SELECT * FROM Product WHERE is_deleted = FALSE'
  );

  for (const product of products) {
    if (!product.ID) {
      product.allergies = []; // Assign an empty array for allergies
      continue;
    }

    try {
      const allergies = await getAllergiesByProductId(product.ID);
      product.allergies = allergies;
    } catch (error) {
      console.error(
        `Error fetching allergies for product ID ${product.ID}:`,
        error
      );
    }
  }

  return products;
};

const insertProduct = async ({name, price, description, category}) => {
  const [result] = await promisePool.execute(
    'INSERT INTO Product (name, price, description, category) VALUES (?, ?, ?, ?)',
    [name, price, description, category]
  );
  return result;
};

const removeProductById = async (id) => {
  const [result] = await promisePool.execute(
    `UPDATE Product 
     SET is_deleted = TRUE, 
         deleted_at = CURRENT_TIMESTAMP 
     WHERE ID = ?`,
    [id]
  );
  return result;
};

const getProductById = async (id) => {
  const [product] = await promisePool.execute(
    'SELECT * FROM Product WHERE id = ?',
    [id]
  );

  if (product.length === 0) return null;

  const allergies = await getAllergiesByProductId(id);
  return {...product[0], allergies};
};

const getProductByType = async (type) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM Product WHERE category = ?',
    [type]
  );
  return rows;
};

const updateProductById = async (id, updateData) => {
  const fields = [];
  const values = [];

  // Build dynamic query based on provided fields
  for (const [key, value] of Object.entries(updateData)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  values.push(id);

  const query = `UPDATE Product SET ${fields.join(', ')} WHERE id = ?`;
  const [result] = await promisePool.execute(query, values);
  return result;
};

//Allergies:

const createAllergy = async (name) => {
  const [result] = await promisePool.execute(
    'INSERT INTO Allergy (name) VALUES (?)',
    [name]
  );
  return result;
};

// Get all allergies
const getAllAllergies = async () => {
  const [rows] = await promisePool.execute('SELECT * FROM Allergy');
  return rows;
};

const addAllergyToProduct = async (productId, allergyId) => {
  // First check if product exists
  const [product] = await promisePool.execute(
    'SELECT * FROM Product WHERE id = ?',
    [productId]
  );
  if (product.length === 0) {
    throw new Error('Product not found');
  }

  // Check if allergy exists
  const [allergy] = await promisePool.execute(
    'SELECT * FROM Allergy WHERE id = ?',
    [allergyId]
  );
  if (allergy.length === 0) {
    throw new Error('Allergy not found');
  }

  // Check if relationship already exists
  const [existing] = await promisePool.execute(
    'SELECT * FROM ProductAllergy WHERE product_id = ? AND allergy_id = ?',
    [productId, allergyId]
  );
  if (existing.length > 0) {
    throw new Error('Allergy already assigned to product');
  }

  // Create the relationship
  const [result] = await promisePool.execute(
    'INSERT INTO ProductAllergy (product_id, allergy_id) VALUES (?, ?)',
    [productId, allergyId]
  );
  return result;
};

const getAllergyByName = async (name) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM Allergy WHERE name = ?',
    [name]
  );
  return rows[0];
};

// Remove allergy from a product
const removeAllergyFromProduct = async (productId, allergyId) => {
  // First check if the relationship exists
  const [existing] = await promisePool.execute(
    'SELECT * FROM ProductAllergy WHERE product_id = ? AND allergy_id = ?',
    [productId, allergyId]
  );

  if (existing.length === 0) {
    throw new Error('Allergy not found for this product');
  }

  // If it exists, delete it
  const [result] = await promisePool.execute(
    'DELETE FROM ProductAllergy WHERE product_id = ? AND allergy_id = ?',
    [productId, allergyId]
  );

  return result;
};

// Get all allergies for a product
const getAllergiesByProductId = async (productId) => {
  if (!productId) {
    console.error('getAllergiesByProductId called with undefined productId'); // Debugging log
    return [];
  }

  try {
    const [rows] = await promisePool.execute(
      `SELECT a.id, a.name
       FROM Allergy a
       JOIN ProductAllergy pa ON a.id = pa.allergy_id
       WHERE pa.product_id = ?`,
      [productId]
    );
    return rows;
  } catch (error) {
    console.error('Error executing getAllergiesByProductId query:', error);
    throw error;
  }
};

export {
  listAllProducts,
  insertProduct,
  removeProductById,
  getProductById,
  getProductByType,
  updateProductById,
  addAllergyToProduct,
  removeAllergyFromProduct,
  getAllergiesByProductId,
  createAllergy,
  getAllAllergies,
  getAllergyByName,
};
