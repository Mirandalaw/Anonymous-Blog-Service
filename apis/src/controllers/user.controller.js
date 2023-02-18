const { isValidObjectId } = require('mongoose');
const userService = require('../services/user.service');

const searchAll = async (req, res) => {
    try {
        const user = await userService.getUser();
        return res.send({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
}

const searchForId = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" });
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
        if (!username) return res.status(400).send({ error: "username is required" });
        if (!name || !name.first || !name.last) return res.status(400).send({ err: "Both first and last names are required" });

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
        if (!isValidObjectId(userId)) return res.status(400).send({ err: "user" });
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
        if (!isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" });
        const { age, name } = req.body;
        if (!age && !name) return res.status(400).send({ error: "age or name is required" });
        if (age && typeof age !== 'number') return res.status(400).send({ err: "age must be a number" });
        if (name && typeof name.first !== "string" && typeof name.last !== 'string') return res.status(400).send({ err: "first and last name are strings" });
        // const user = await User.findByIdAndUpdate(userId,{age},{new:true});
        let user = await userService.refreshUser(userId, age, name);
        return res.send({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
}
module.exports = { searchAll, searchForId, createUser, deleteUser, updateUser };