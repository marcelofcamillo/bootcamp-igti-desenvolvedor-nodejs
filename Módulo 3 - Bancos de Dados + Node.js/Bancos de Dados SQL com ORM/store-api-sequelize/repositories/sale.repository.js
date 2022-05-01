import { connect } from './db.js';

async function createSale(sale) {
  const conn = await connect();

  try {
    const sql =
      'INSERT INTO sales (value, date, client_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [sale.value, sale.date, sale.client_id, sale.product_id]; // prettier-ignore
    const res = await conn.query(sql, values);

    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}

async function getSales() {
  const conn = await connect();

  try {
    const res = await conn.query('SELECT * FROM sales');

    return res.rows;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}

async function getSalesByProductId(product_id) {
  const conn = await connect();

  try {
    const sql = 'SELECT * FROM sales WHERE product_id = $1';
    const res = await conn.query(sql, [product_id]);

    return res.rows;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}

async function getSale(id) {
  const conn = await connect();

  try {
    const sql = 'SELECT * FROM sales WHERE sale_id = $1';
    const value = [id];
    const res = await conn.query(sql, value);

    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteSale(id) {
  const conn = await connect();

  try {
    await conn.query('DELETE FROM sales WHERE sale_id = $1', [id]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updateSale(sale) {
  const conn = await connect();

  try {
    const sql =
      'UPDATE sales SET value = $1, date = $2, client_id = $3 WHERE sale_id = $4 RETURNING *';
    const values = [sale.value, sale.date, sale.client_id, sale.sale_id]; // prettier-ignore
    const res = await conn.query(sql, values);

    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  createSale,
  getSales,
  getSalesByProductId,
  getSale,
  deleteSale,
  updateSale,
};
