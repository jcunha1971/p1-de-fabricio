const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'mydatabase',
});

class ProductsRepository {
  async findAll() {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM products');
      return rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async findById(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM products WHERE id = ?', [id]);
      return rows.length ? rows[0] : null;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async delete(id) {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query('DELETE FROM products WHERE id = ?', [id]);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async create({ name, price, subcategory }) {
    let conn;
    try {
      conn = await pool.getConnection();
      const { insertId } = await conn.query(
        'INSERT INTO products (name, price, subcategory) VALUES (?, ?, ?)',
        [name, price, subcategory]
      );
      const createdProduct = {
        id: insertId,
        name,
        price,
        subcategory,
      };
      return createdProduct;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async update(id, { name, price, subcategory }) {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(
        'UPDATE products SET name = ?, price = ?, subcategory = ? WHERE id = ?',
        [name, price, subcategory, id]
      );
      const updatedProduct = {
        id,
        name,
        price,
        subcategory,
      };
      return updatedProduct;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }
}

module.exports = new ProductsRepository();
