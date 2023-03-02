const { Router } = require('express');
const commentRouter = Router({ mergeParams: true });
const commentController = require('../controllers/comment.controller');
const { check } = require('express-validator');
const validationErrorChecker = require('../middlewares/validator');

commentRouter.post('/', [
    check('blogId').isMongoId(),
    check('content').exists().isString(),
    check('userId').isMongoId(),
    validationErrorChecker,
], commentController.createComment);
commentRouter.get('/', [
    check('blogId').isMongoId(),
    validationErrorChecker,
], commentController.searchForId);
commentRouter.patch('/:commentId', [
    check('blogId').isMongoId(),
    check('commentId').isMongoId(),
    check('content').exists().isString(),
    validationErrorChecker,
], commentController.updateComment);
commentRouter.delete('/:commentId', [
    check('blogId').isMongoId(),
    check('commentId').isMongoId(),
    validationErrorChecker,
], commentController.deleteComment)

module.exports = { commentRouter };