const express = require('express');
const viewBlogController = require('../controllers/viewBlogController');

const router = express.Router();

router.get('/', viewBlogController.getAllBlogs);
router.get('/new', viewBlogController.renderNewForm);
router.post('/blogs', viewBlogController.createBlog);
router.get('/blogs/:id', viewBlogController.getBlogById);
router.get('/blogs/:id/delete', viewBlogController.deleteBlog);
router.get('/blogs/:id/edit', viewBlogController.renderEditForm);
router.post('/blogs/:id', viewBlogController.updateBlog);

module.exports = router;
