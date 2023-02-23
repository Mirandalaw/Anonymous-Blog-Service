const { Router } = require('express')
const { commentRouter } = require('../routes/commentRoute');
const blogController = require('../controllers/blog.controller');
const { body } = require('express-validator');

const blogRouter = Router();
blogRouter.use('/:blogId/comment', commentRouter);

blogRouter.post('/', [
    body('title').exists().isString(),
    body('content').exists().isString(),
    body('islive').exists().isBoolean(),

], blogController.createBlog);
blogRouter.get('/', blogController.searchAllBlog);
blogRouter.get('/:blogId', blogController.searchForId);
blogRouter.put('/:blogId', blogController.updateBlog);
blogRouter.patch('/:blogId/live', blogController.patchBlog);

module.exports = { blogRouter };