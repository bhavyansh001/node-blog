const express = require('express');
const bodyParser = require('body-parser');
const apiBlogRoutes = require('./routes/api/blogRoutes');
const viewRoutes = require('./routes/viewRoutes');
const { initializeDatabase } = require('./config/database');
const commentApiRoutes = require('./routes/api/commentRoutes');
const commentWebRoutes = require('./routes/web/commentRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes (JSON)
app.use('/api/blogs', apiBlogRoutes);
app.use('/api/comments', commentApiRoutes);

// View Routes (HTML)
app.use('/', viewRoutes);
app.use('/comments', commentWebRoutes);

// Debug route to check if endpoints are working
app.get('/debug/routes', (req, res) => {
  const routes = [];
  app._router.stack.forEach(middleware => {
    if(middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if(middleware.name === 'router') {
      middleware.handle.stack.forEach(handler => {
        if(handler.route) {
          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods)
          });
        }
      });
    }
  });
  res.json(routes);
});

initializeDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });