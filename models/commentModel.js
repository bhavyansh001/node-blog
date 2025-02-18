const { pool } = require('../config/database');

const Comment = {
  getAll: async (blogId) => {
    const result = await pool.query('SELECT * FROM comments WHERE blog_id = $1 ORDER BY id DESC', [blogId]);
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM comments WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  create: async (blogId, content) => {
    const result = await pool.query(
      'INSERT INTO comments (blog_id, content) VALUES ($1, $2) RETURNING *', [blogId, content]
    );
    return result.rows[0];
  },

  update: async (id, content) => {
    const result = await pool.query('UPDATE comments SET content = $1 WHERE id = $2 RETURNING *', [content, id]);
    return result.rows[0];
  },

  delete: async (id) => {
    await pool.query('DELETE FROM comments WHERE id = $1', [id]);
    return { message: 'Comment deleted successfully' };
  },
};

module.exports = Comment;