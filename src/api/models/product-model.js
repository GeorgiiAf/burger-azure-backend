import promisePool from '../../utils/database.js';

const listAllProducts = async () => {
  const [rows] = await promisePool.execute('SELECT * FROM Product');
  return rows;
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
    'DELETE FROM Product WHERE id = ?',
    [id]
  );
  return result;
};

const getProductById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM Product WHERE id = ?',
    [id]
  );
  return rows[0];
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

  values.push(id); // Add ID for WHERE clause

  const query = `UPDATE Product SET ${fields.join(', ')} WHERE id = ?`;
  const [result] = await promisePool.execute(query, values);
  return result;
};

export {
  listAllProducts,
  insertProduct,
  removeProductById,
  getProductById,
  getProductByType,
  updateProductById,
};
