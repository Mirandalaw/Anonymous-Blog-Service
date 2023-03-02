const { isValidObjectId } = require('mongoose');
const userService = require('../services/user.service');

const searchAll = async (req, res) => {
    try {
        const user = await userService.getUser();
        return res.status(200).send({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
}

const searchForId = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getOneUser(userId);
        return res.send({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        let { username, name } = req.body;
        const user = await userService.makeUser(req.body);
        return res.send({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const [user] = await userService.eraseUser(userId);
        return res.send({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { age, name } = req.body;
        // const user = await User.findByIdAndUpdate(userId,{age},{new:true});
        let user = await userService.refreshUser(userId, age, name);
        return res.send({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
}
module.exports = { searchAll, searchForId, createUser, deleteUser, updateUser };