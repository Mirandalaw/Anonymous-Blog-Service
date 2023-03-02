const { Router } = require('express')
const { commentRouter } = require('../routes/commentRoute');
const blogController = require('../controllers/blog.controller');
const { check } = require('express-validator');
const validationErrorChecker = require('../middlewares/validator');
const blogRouter = Router();
blogRouter.use('/:blogId/comment', commentRouter);

blogRouter.post('/', [
    check('title').exists().isString(),
    check('content').exists().isString(),
    check('userId').isMongoId(),
    validationErrorChecker,
], blogController.createBlog);
blogRouter.get('/', blogController.searchAllBlog);
blogRouter.get('/:blogId', [
    check('blogId').isMongoId(),
    validationErrorChecker,
], blogController.searchForId);
blogRouter.put('/:blogId', [
    check('blogId').isMongoId(),
    check('title').exists().isString(),
    check('content').exists().isString(),
    validationErrorChecker,
], blogController.updateBlog);
blogRouter.patch('/:blogId/live', [
    check('blogId').isMongoId(),
    check('live').exists().isBoolean(),
    validationErrorChecker,
], blogController.patchBlog);

module.exports = { blogRouter };