import express from 'express';
import mongoose from 'mongoose';
import { userRouter } from './apis/src/routes/userRoute.js';
import dotenv from 'dotenv';
import { blogRouter } from './apis/src/routes/blogRoute.js';
import {commentRouter} from './apis/src/routes/commentRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const server = async() =>{
    try {
        mongoose.set("strictQuery",false);
        await mongoose.connect(MONGO_URI,{});
        mongoose.set('debug',true);
        app.use(express.json());
        app.use(express.urlencoded({extended:false}));
        app.use('/user',userRouter);
        app.use('/blog',blogRouter);

        app.listen(PORT,()=>{
            console.log(`Express Server is listening at ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

server();