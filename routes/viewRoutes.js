const express = require('express');
const { pool } = require('../config/database');

const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new');
  });
  
  router.post('/blogs', async (req, res) => {
    const { title, body } = req.body;
    try {
      await pool.query('INSERT INTO blogs (title, body) VALUES ($1, $2)', [title, body]);
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Error creating blog post');
      console.log(err);
    }
  });
  
  router.get('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        res.render('show', { blog: result.rows[0] });
      } else {
        res.status(404).send('Blog post not found');
      }
    } catch (err) {
      res.status(500).send('Error loading blog post');
    }
  });
  
  router.get('/blogs/:id/delete', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM blogs WHERE id = $1', [id]);
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Error deleting blog post');
    }
  });

  router.get('/blogs/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        res.render('edit', { blog: result.rows[0] });
      } else {
        res.status(404).send('Blog post not found');
      }
    } catch (err) {
      res.status(500).send('Error loading blog post for editing');
      console.log(err);
    }
  });
  
  router.post('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
      await pool.query('UPDATE blogs SET title = $1, body = $2 WHERE id = $3', 
        [title, body, id]);
      res.redirect(`/blogs/${id}`);
    } catch (err) {
      res.status(500).send('Error updating blog post');
      console.log(err);
    }
  });

module.exports = router;
