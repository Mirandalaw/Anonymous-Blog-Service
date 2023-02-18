const { User, Blog, Comment } = require('../models');

const getComment = async (page, blogId) => {
    try {
        const comment = await Comment.find({ blog: blogId }).sort({ createAt: -1 }).skip(page * 3).limit(3);
        return comment;
    } catch (error) {
        throw new Error("Error while finding a comment");
    }
}

const makeComment = async (blogId, content, user, blog) => {
    try {
        const comment = new Comment({ content, user, userFullName: `${user.name.first} ${user.name.last}`, blog: blogId });
        // await session.abortTransaction();
        // await Promise.all([
        //     comment.save(),
        //     Blog.updateOne({_id : blogId},{$push : {comment : comment}})
        // ]);
        // blog.commentsCount++;
        // blog.comment.push(comment);
        // if(blog.commentsCount>3) blog.comment.shift();

        // await Promise.all([
        //     comment.save(),
        //     blog.save(),
        //     // Blog.updateOne({_id : blogId},{ $inc : {commentsCount : 1}}),
        // ])

        await Promise.all([
            comment.save(),
            Blog.updateOne({ _id: blogId }, { $inc: { commentsCount: 1 } }, { $pop: { comment: { $each: [comment], $slice: -3 } } }),
        ])
        return comment;
    } catch (error) {
        throw new Error("Error while making a comment");
    }
}

const eraseComment = async (commentId) => {
    try {
        const comment = await Comment.findOneAndDelete({ "_id": commentId });
        await Blog.updateOne({ "comment._id": commentId }, { $pull: { comment: { _id: commentId } } }, { new: true });
        return comment;
    } catch (error) {
        throw new Error("Error while erasing a comment");
    }
}

const refreshComment = async (commentId, content) => {
    try {
        const [comment] = await Promise.all([
            Comment.findByIdAndUpdate({ _id: commentId }, { content }, { new: true }),
            Blog.updateOne({ "comment._id": commentId }, { "comment.$.content": content })
        ]);
        return [comment];
    } catch (error) {
        throw new Error("Error while refreshing a comment");
    }
}

module.exports = { getComment, makeComment, eraseComment, refreshComment };