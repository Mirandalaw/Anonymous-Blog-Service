const { isValidObjectId, startSession } = require('mongoose');
const { commentService, blogService, userService } = require('../services');
const searchForId = async (req, res) => {
    let { page = 0 } = req.query;
    page = parseInt(page);
    const { blogId } = req.params;
    if (!isValidObjectId(blogId)) return res.status(400).send({ err: "blogId is invalid" });

    const comment = await commentService.getComment(page, blogId);
    return res.send({ comment });
}

const createComment = async (req, res) => {
    // const session = await startSession();
    let comment;
    try {
        // await session.withTransaction(async() =>{
        const { blogId } = req.params;
        const { content, userId } = req.body;
        if (!isValidObjectId(blogId)) return res.status(400).send({ err: "blogId is invalid" });
        if (!isValidObjectId(userId)) return res.status(400).send({ err: "userId is invalid" });
        if (typeof content !== "string") return res.status(400).send({ err: "content is required" });

        // 동기적으로 실행 -> 비동기적으로 동시에 실행할 수 있게함으로써 Response 시간 개선하기
        const [blog, user] = await Promise.all(
            [blogService.getOneBlog(blogId),
            userService.getOneUser(userId)]
        )
        if (!blog.islive) return res.status(400).send({ err: " blog is not available" });
        if (!blog || !user) return res.status(400).send({ err: "blog or user does not exist" });

        const comment = await commentService.makeComment(blogId, content, user, blog);
        // })
        return res.send({ comment });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
    // }finally{
    //     await session.endSession();
    // }
}
const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    if (!isValidObjectId(commentId)) return res.status(400).send({ err: "invalid commentId " });
    const comment = await commentService.eraseComment(commentId);
    return res.send({ comment });
}

const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    console.log(content);
    if (typeof content !== "string") {
        return res.status(400).send({ err: "content is required" });
    }

    const [comment] = await commentService.refreshComment(commentId, content);
    return res.send({ comment });
}

module.exports = { searchForId, createComment, deleteComment, updateComment };