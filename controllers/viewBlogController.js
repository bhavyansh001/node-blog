const Blog = require('../models/blogModel');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.getAll();
    res.render('index', { blogs });
  } catch (error) {
    res.status(500).send('Error loading blog posts');
    console.log(error);
  }
};

exports.renderNewForm = (req, res) => {
  res.render('new');
};

exports.createBlog = async (req, res) => {
  const { title, body } = req.body;
  try {
    await Blog.create(title, body);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error creating blog post');
    console.log(error);
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.getById(req.params.id);
    if (blog) {
      res.render('show', { blog });
    } else {
      res.status(404).send('Blog post not found');
    }
  } catch (error) {
    res.status(500).send('Error loading blog post');
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.delete(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error deleting blog post');
  }
};

exports.renderEditForm = async (req, res) => {
  try {
    const blog = await Blog.getById(req.params.id);
    if (blog) {
      res.render('edit', { blog });
    } else {
      res.status(404).send('Blog post not found');
    }
  } catch (error) {
    res.status(500).send('Error loading blog post for editing');
    console.log(error);
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  
  try {
    await Blog.update(id, title, body);
    res.redirect(`/blogs/${id}`);
  } catch (error) {
    res.status(500).send('Error updating blog post');
    console.log(error);
  }
};