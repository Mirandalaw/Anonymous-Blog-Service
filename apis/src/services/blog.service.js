const { Blog, User, Comment } = require('../models');

const getBlog = async (page) => {
    try {
        const blogs = await Blog.find({}).sort({ updatedAt: -1 }).skip(page * 3).limit(3);
        return blogs;
    } catch (error) {
        throw new Error("Error while finding all blogs!!");
    }
}

const getOneBlog = async (blogId) => {
    try {
        const blog = await Blog.findOne({ _id: blogId });
        return blog;
    } catch (error) {
        throw new Error("Error while finding a blog!!");
    }
}

const makeBlog = async (body, user) => {
    try {
        let blog = new Blog({ ...req.body, user });
        await blog.save();
        return blog;
    } catch (error) {
        throw new Error("Error while making a blog!!");
    }
}

const patchBlog = async (blogId, islive) => {
    try {
        const blog = await Blog.findByIdAndUpdate(blogId, { islive }, { new: true });
        return blog;
    } catch (error) {
        throw new Error("Error while patching a blog!!");
    }
}

const refreshBlog = async (blogId, title, content) => {
    try {
        const blog = await Blog.findOneAndUpdate({ _id: blogId }, { title, content }, { new: true });
        return blog;
    } catch (error) {
        throw new Error("Error while updating a blog!!");
    }
}

module.exports = { getBlog, getOneBlog, makeBlog, patchBlog, refreshBlog };