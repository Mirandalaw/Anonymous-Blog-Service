import express from 'express';
import mongoose from 'mongoose';
import { userRouter } from './apis/src/user/routes/userRoute.js';
import dotenv from 'dotenv';
import { blogRouter } from './apis/src/user/routes/blogRoute.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", false);
mongoose
    .connect(MONGO_URI,{})
    .then(()=> console.log('Success to connect DB'))
    .catch(e => console.log(e.message));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/user',userRouter);
app.use('/blog',blogRouter);

app.listen(PORT,()=>{
    console.log(`Express Server is listening at ${PORT}`);
})