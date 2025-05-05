import promisePool from '../../utils/database.js';

const addReview = async (reservationId, opinion, stars) => {
  const [result] = await promisePool.execute(
    'INSERT INTO Review (reservation_id, opinion, stars) VALUES (?, ?, ?)',
    [reservationId, opinion, stars]
  );
  return result;
};

const getAllReviews = async () => {
  const [rows] = await promisePool.execute('SELECT * FROM Review');
  return rows;
};

export { addReview, getAllReviews };

