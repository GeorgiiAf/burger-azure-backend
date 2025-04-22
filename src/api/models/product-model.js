import promisePool from '../../utils/database.js';

const listAllProducts = async () => {
  const [rows] = await promisePool.execute('SELECT * FROM Product');
  console.log(rows);
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM Product WHERE id = ?', [id]);
  console.log(rows);
  return rows[0];
};

const getProductByType = async (type) => {
  const [rows] = await promisePool.execute('SELECT * FROM Product WHERE category = ?', [type]);
  console.log(rows);
  return rows;
};

export {listAllProducts, getProductById, getProductByType};
