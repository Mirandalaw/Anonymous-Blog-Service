const {Router} = require('express');
const commentRouter = Router({mergeParams:true});
const {User, Blog, Comment} = require('../models');
const {isValidObjectId} = require('mongoose');

commentRouter.post('/',async(req,res)=>{
    try {
        const {blogId} = req.params;
        const {content, userId} = req.body;
        if(!isValidObjectId(blogId)) return res.status(400).send({err : "blogId is invalid"});
        if(!isValidObjectId(userId)) return res.status(400).send({err : "userId is invalid"});
        if(typeof content!=="string") return res.status(400).send({err : "content is required"});

        // 동기적으로 실행 -> 비동기적으로 동시에 실행할 수 있게함으로써 Response 시간 개선하기
        const [blog,user] = await Promise.all(
            [Blog.findById(blogId),
            User.findById(userId)]
        )
        if(!blog.islive)return res.status(400).send({err :" blog is not available"});
        if(!blog||!user)return res.status(400).send({err : "blog or user does not exist"});

        const comment = new Comment({content,user,userFullName : `${user.name.first} ${user.name.last}`,blog});
        await Promise.all([
            comment.save(),
            Blog.updateOne({_id : blogId},{$push : {comment : comment}})
        ]);
        return res.send({comment});
    } catch (error) {
        return res.status(400).send({error : error.message});
    }
});
commentRouter.get('/',async(req,res)=>{
    const {blogId} = req.params;
    if(!isValidObjectId(blogId)) return res.status(400).send({err : "blogId is invalid"});

    const comment = await Comment.find({blog : blogId}).limit(20);
    return res.send({comment});
});
commentRouter.patch('/:commentId',async(req,res)=>{
    const {commentId} =req.params;
    const {content} = req.body;
    console.log(content);
    if(typeof content !=="string"){
        return res.status(400).send({err : "content is required"});
    }

    const [comment] = await Promise.all([
        Comment.findByIdAndUpdate({_id : commentId},{content},{new:true}),
        Blog.updateOne({"comment._id" : commentId},{"comment.$.content" : content})
    ]);
    return res.send({comment});
});
commentRouter.delete('/:commentId',async(req,res)=>{
    const {commentId} = req.params;
    if(!isValidObjectId(commentId)) return res.status(400).send({err: "invalid commentId "});
    const comment = await Comment.findOneAndDelete({"_id" : commentId});
    await Blog.updateOne({"comment._id" : commentId},{$pull : {comment : {_id : commentId}}},{new:true});
    return res.send({comment});
})
module.exports = {commentRouter};