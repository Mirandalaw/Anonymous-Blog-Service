const { Router } = require('express');
const userRouter = Router();

const userController = require('../controllers/user.controller');

userRouter.get('/', userController.searchAll);
userRouter.get('/:userId', userController.searchForId);
userRouter.post('/', userController.createUser);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.put('/:userId', userController.updateUser);

module.exports = { userRouter };