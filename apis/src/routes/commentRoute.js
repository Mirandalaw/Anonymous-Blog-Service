import {Router} from "express";
import { isValidObjectId } from "mongoose";
import { Comment } from "../models/Comment.js";
import { Blog } from "../models/Blog.js";
import { User } from "../models/User.js";

const commentRouter = Router({mergeParams:true});

commentRouter.post('/',async(req,res)=>{
    try {
        const {blogId} = req.params;
        const {content, userId} = req.body;
        if(!isValidObjectId(blogId)) return res.status(400).send({err : "blogId is invalid"});
        if(!isValidObjectId(userId)) return res.status(400).send({err : "userId is invalid"});
        if(typeof content!=="string") return res.status(400).send({err : "content is required"});

        const blog = await Blog.findByIdAndUpdate(blogId);
        if(!blog.islive) res.status(400).send({err :" blog is not available"});
        const user = await User.findByIdAndUpdate(userId);
        if(!blog||!user)return res.status(400).send({err : "blog or user does not exist"});

        const comment = new Comment({content,user,blog});
        return res.send({comment});
    } catch (error) {
        return res.status(400).send({error : error.message});
    }
});
commentRouter.get('/')
export {commentRouter};