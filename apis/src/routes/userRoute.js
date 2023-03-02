const { Router } = require('express');
const userRouter = Router();
const { check } = require('express-validator');
const validationErrorChecker = require('../middlewares/validator');
const userController = require('../controllers/user.controller');

userRouter.get('/', userController.searchAll);
userRouter.get('/:userId', [
    check('userId').isMongoId(),
    validationErrorChecker,
], userController.searchForId);

userRouter.post('/', [
    check('username').exists().isString(),
    check('name').exists().isObject(),
    check('age').exists().isInt(),
    check('email').exists().isEmail(),
    validationErrorChecker,
], userController.createUser);

userRouter.delete('/:userId', [
    check('userId').isMongoId(),
    validationErrorChecker,
], userController.deleteUser);

userRouter.put('/:userId', [
    check('userId').isMongoId(),
    check('name').exists().isObject(),
    check('age').exists().isInt(),
    validationErrorChecker,
], userController.updateUser);

module.exports = { userRouter };