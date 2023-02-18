const { Router } = require('express');
const commentRouter = Router({ mergeParams: true });
const commentController = require('../controllers/comment.controller');

commentRouter.post('/', commentController.createComment);
commentRouter.get('/', commentController.searchForId);
commentRouter.patch('/:commentId', commentController.updateComment);
commentRouter.delete('/:commentId', commentController.deleteComment)

module.exports = { commentRouter };