import express from 'express';
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

export {userRouter};