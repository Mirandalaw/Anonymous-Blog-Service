const { Router } = require('express')
const { commentRouter } = require('../routes/commentRoute');
const blogController = require('../controllers/blog.controller');

const blogRouter = Router();
blogRouter.use('/:blogId/comment', commentRouter);

blogRouter.post('/', blogController.createBlog);
blogRouter.get('/', blogController.searchAllBlog);
blogRouter.get('/:blogId', blogController.searchForId);
blogRouter.put('/:blogId', blogController.updateBlog);
blogRouter.patch('/:blogId/live', blogController.patchBlog);

module.exports = { blogRouter };