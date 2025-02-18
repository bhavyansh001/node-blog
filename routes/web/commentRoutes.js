const express = require('express');
const commentController = require('../../controllers/commentController');

const router = express.Router({ mergeParams: true }); // To access parent route params

router.get('/new/:blogId', commentController.renderNewCommentForm);
router.get('/:id/edit', commentController.getEditCommentForm);
router.post('/blog/:blogId', commentController.createComment);
router.post('/:id', commentController.updateComment);
router.get('/:id/delete', commentController.deleteComment);

module.exports = router;