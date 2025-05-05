import promisePool from '../../utils/database.js';

const createOrder = async (user_id, items, price, status) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Get product prices and validate products
    const productPrices = new Map();
    for (const item of items) {
      const [product] = await connection.execute(
        'SELECT ID, price FROM Product WHERE ID = ?',
        [item.product_id]
      );

      if (!product.length) {
        throw new Error(`Product with ID ${item.product_id} not found`);
      }
      productPrices.set(item.product_id, product[0].price);
    }

    // 3. Create reservation
    const [reservationResult] = await connection.execute(
      'INSERT INTO Reservations (user_id, status, price, timestamp) VALUES (?, ?, ?, ?)',
      [user_id, status, price, new Date()]
    );
    const reservationId = reservationResult.insertId;

    // 4. Create reservation products
    const reservationProductsValues = items.map((item) => [
      reservationId,
      item.product_id,
      item.quantity,
    ]);

    await connection.query(
      'INSERT INTO ReservationProducts (reservation_id, product_id, quantity) VALUES ?',
      [reservationProductsValues]
    );

    await connection.commit();
    return reservationId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getAllReservationProducts = async () => {
  const [rows] = await promisePool.execute('SELECT * FROM ReservationProducts');
  return rows;
};

const getOrderById = async (id) => {
  // Get reservation details
  const [reservation] = await promisePool.execute(
    'SELECT * FROM Reservations WHERE ID = ?',
    [id]
  );

  if (!reservation.length) return null;

  // Get reservation products
  const [products] = await promisePool.execute(
    `SELECT p.ID, p.name, p.price, rp.quantity
       FROM reservationProducts rp
       JOIN Product p ON rp.product_id = p.ID
       WHERE rp.reservation_id = ?`,
    [id]
  );

  return {
    ...reservation[0],
    products,
  };
};

const getAllOrdersFromDB = async () => {
  // Get all reservations
  const [reservations] = await promisePool.execute(
    'SELECT * FROM Reservations'
  );

  // Fetch products for each reservation
  for (const reservation of reservations) {
    const [products] = await promisePool.execute(
      `SELECT p.ID, p.name, p.price, rp.quantity
       FROM ReservationProducts rp
       JOIN Product p ON rp.product_id = p.ID
       WHERE rp.reservation_id = ?`,
      [reservation.ID]
    );
    reservation.products = products; // Attach products to each reservation
  }

  return reservations;
};

export {createOrder, getOrderById, getAllOrdersFromDB, getAllReservationProducts};
