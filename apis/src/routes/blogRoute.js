const {Router} = require('express')
const blogRouter = Router();
const {Blog,User} = require('../models');
const {isValidObjectId} =require('mongoose');
const {commentRouter} = require('../routes/commentRoute');

blogRouter.use('/:blogId/comment',commentRouter);

blogRouter.post('/',async(req,res)=>{
    try {
        const {title,content,islive,userId} = req.body;
        if(typeof title !=='string') return res.status(400).send({err:"title is required"});
        if(typeof content !=='string') return res.status(400).send({err:"content is required"});
        if(islive && typeof(islive) !=="boolean") return res.status(400).send({err:"islive must be a boolean"});
        if(!isValidObjectId(userId)) return res.status(400).send({err:"userId is invalid"});
        
        let user = await User.findById(userId);
        if(!user) return res.status(400).send({err:"user does not exist"});

        let blog = new Blog({...req.body,user});
        await blog.save();
        return res.send({blog});

    } catch (error) {
        console.log(error);
        res.status(500).send({error : error.message});
    }
});

blogRouter.get('/',async(req,res)=>{
    try {
        let blogs = await Blog.find({}).limit(20);
            // .select('title content')
            // .populate([{path : "user"},{path:"comments"}
                // {path:"user",select : 'name fullName'},
                // {
                //     path : "comments",
                //     select : "content",
                //     match : {user : "63e65962e61b7b7f6c5161d0"},
                //     populate : {path:"user",select : "name fullName"},
                // },
            // ]);
        res.send(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).send({error : error.message});
    }
});

blogRouter.get('/:blogId',async(req,res)=>{
    try {
        const {blogId} = req.params;
        if(!isValidObjectId(blogId)) res.status(400).send({err:"blogId is invalid"});
    
        const blog = await Blog.findOne({_id:blogId});
        return res.send({blog});
    } catch (error) {
        console.log(error);
        res.status(500).send({error : error.message});
    }
});

blogRouter.put('/:blogId',async(req,res)=>{
    try {
        const {title,content} = req.body;
        if(typeof title !=='string') res.status(400).send({err:"title is required"});
        if(typeof content !=='string') res.status(400).send({err:"content is required"});
        const {blogId} = req.params;
        if(!isValidObjectId(blogId)) res.status(400).send({err:"blogId is invalid"});
        const blog = await Blog.findOneAndUpdate({_id:blogId},{title, content},{new:true});
        return res.send({blog});
    } catch (error) {
        console.log(error);
        res.status(500).send({error : error.message});
    }
});

blogRouter.patch('/:blogId/live',async(req,res)=>{
    try {
        const { blogId } = req.params;
        if(!isValidObjectId(blogId)) res.status(400).send({err: "blogId is invalid"});
        
        const{islive} = req.body;
        if(typeof islive !=="boolean") res.status(400).send({err : "boolean islive is required"});

        const blog = await Blog.findByIdAndUpdate(blogId,{islive},{new:true});
        return res.send({blog});
    } catch (error) {
        console.log(error);
        res.status(500).send({error : error.message});
    }
});

module.exports = {blogRouter};