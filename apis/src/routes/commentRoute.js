const {Router} = require('express');
const commentRouter = Router({mergeParams:true});
const {User, Blog, Comment} = require('../models');
const {isValidObjectId,startSession} = require('mongoose');

commentRouter.post('/',async(req,res)=>{
    // const session = await startSession();
    let comment;
    try {
    // await session.withTransaction(async() =>{
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

        comment = new Comment({content,user,userFullName : `${user.name.first} ${user.name.last}`,blog  : blogId});
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
            Blog.updateOne({_id : blogId},{$inc : {commentsCount : 1}},{$pop : {comment :{ $each : [comment] ,$slice : -3}}}),
        ])
    // })
    return res.send({comment});
    } catch (error) {
        return res.status(400).send({error : error.message});
    }
    // }finally{
    //     await session.endSession();
    // }
});
commentRouter.get('/',async(req,res)=>{
    let {page = 0} =  req.query;
    page = parseInt(page);
    const {blogId} = req.params;
    if(!isValidObjectId(blogId)) return res.status(400).send({err : "blogId is invalid"});

    const comment = await Comment.find({blog : blogId}).sort({createAt : -1}).skip(page * 3).limit(3);
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