import express from 'express';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
const userRouter = express.Router();

userRouter.get('/',async(req,res)=>{
    try {
        const users = await User.find({});
        return res.send({users});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error :error.message});
    }
});
userRouter.get('/:userId',async (req,res)=>{
    try {
        const {userId} = req.params;
        if(!mongoose.isValidObjectId(userId)) return res.status(400).send({err : "invalid userId"});
        const user = await User.findOne({_id : userId});
        return res.send({user});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error :error.message});
    }
})
userRouter.post('/',async (req,res)=>{
    try {
        let {username, name} = req.body;
        if(!username) return res.status(400).send({error:"username is required"});
        if(!name || !name.first || !name.last) return res.status(400).send({err:"Both first and last names are required"});

        const user = new User(req.body);
        await user.save();
        return res.send({user});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error :error.message});
    }
})
userRouter.delete('/:userId',async (req,res)=>{
    try {
        const {userId} = req.params;
        if(!mongoose.isValidObjectId(userId)) return res.status(400).send({err : "user"});
        const user = await User.findOneAndDelete({_id : userId});
        return res.send({user});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error :error.message});
    }
})
userRouter.put('/:userId', async (req,res)=>{
    try {
        const {userId} = req.params;
        const {age} = req.body;
        if(!age) return res.status(400).send({error: "age is required"});
        if(typeof age!=='number')return res.status(400).send({error : "age must be a number"});
        const user = await User.findByIdAndUpdate(userId,{age},{new:true});
        return res.send({user});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error :error.message});
    }
})

export {userRouter};