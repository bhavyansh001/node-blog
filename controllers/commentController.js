const Comment = require('../models/commentModel');
const Blog = require('../models/blogModel');

exports.getAllComments = async (req, res) => {
  const { blogId } = req.params;
  try {
    console.log(`Fetching comments for blog ID: ${blogId}`);
    const comments = await Comment.getAll(blogId);
    console.log(`Found ${comments.length} comments`);
    res.json(comments);
  } catch (err) {
    console.error(`Error fetching comments: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

exports.renderNewCommentForm = async (req, res) => {
  res.render('newComment', { blogId: req.params.blogId });
};

exports.getEditCommentForm = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.getById(id);
    if (comment) {
      res.render('editComment', { comment });
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createComment = async (req, res) => {
  const { blogId } = req.params;
  const { content } = req.body;

  try {
    console.log(`Creating comment for blog ID: ${blogId}, content: ${content}`);
    const comment = await Comment.create(blogId, content);
    console.log(`Comment created: ${JSON.stringify(comment)}`);
    res.redirect(`/blogs/${blogId}`);
  } catch (err) {
    console.error(`Error creating comment: ${err.message}`);
    res.status(500).send(err.message);
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.getById(id);
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    
    await Comment.update(id, content);
    res.redirect(`/blogs/${comment.blog_id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.getById(id);
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    
    await Comment.delete(id);
    res.redirect(`/blogs/${comment.blog_id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};