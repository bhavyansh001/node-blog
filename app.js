const express = require('express');
const bodyParser = require('body-parser');
const apiBlogRoutes = require('./routes/api/blogRoutes');
const viewRoutes = require('./routes/viewRoutes');
const { initializeDatabase } = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/blogs', apiBlogRoutes); // API Routes (JSON)
app.use('/', viewRoutes);             // View Routes (HTML)

const { pool } = require('./config/database');
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY id DESC');
    res.render('index', { blogs: result.rows });
  } catch (err) {
    res.status(500).send('Error loading blog posts');
  }
});

initializeDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });
