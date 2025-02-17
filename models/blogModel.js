const pool = require('../config/database').pool;

const Blog = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM blogs');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (title, body) => {
    const result = await pool.query(
      'INSERT INTO blogs (title, body) VALUES ($1, $2) RETURNING *',
      [title, body]
    );
    return result.rows[0];
  },

  update: async (id, title, body) => {
    const result = await pool.query(
      'UPDATE blogs SET title = $1, body = $2 WHERE id = $3 RETURNING *',
      [title, body, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await pool.query('DELETE FROM blogs WHERE id = $1', [id]);
    return { message: 'Blog deleted successfully' };
  },
};

module.exports = Blog;
