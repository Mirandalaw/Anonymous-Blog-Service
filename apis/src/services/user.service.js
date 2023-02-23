const { User, Blog, Comment } = require('../models');

const getUser = async () => {
    try {
        const user = await User.find({});
        return user;
    } catch (error) {
        throw new Error('Error while finding user!! ');
    }
}

const getOneUser = async (userId) => {
    try {
        const user = await User.findOne({ _id: userId });
        return user;
    } catch (error) {
        throw new Error('Error while finding an user!! ');
    }
}

const makeUser = async (userInfo) => {
    try {
        const user = new User(userInfo);
        await user.save();
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Error while making an user!!');
    }
}

const eraseUser = async (userId) => {
    try {
        const [user] = await Promise.all([
            User.findOneAndDelete({ _id: userId }),
            Blog.deleteMany({ "user._id": userId }),
            Blog.updateMany({ "comment.user": userId }, { $pull: { comment: { user: userId } } }),
            Comment.deleteMany({ "user": userId })
        ]);
        return [user];
    } catch (error) {
        throw new Error('Error while deleting an user!!');
    }
}

const refreshUser = async (userId, age, name) => {
    try {
        let user = await User.findById(userId);
        if (age) user.age = age;
        if (name) {
            user.name = name;
            await Promise.all([
                Blog.updateMany({ "user._id": userId }, { "user.name": name }),
                Blog.updateMany({}, { "comment.$[comment].userFullName": `${name.first} ${name.last}  ` }, { arrayFilters: [{ "comment.user._id": userId }] })]);
        }
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error while updating an user!!');
    }
}
module.exports = { getUser, getOneUser, makeUser, eraseUser, refreshUser };