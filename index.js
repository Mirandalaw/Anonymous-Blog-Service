const express = require('express');
const mongoose = require('mongoose');
const { userRouter,blogRouter} = require('./apis/src/routes');
const {generateFakeData} = require('./faker2');
require('dotenv').config();

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

        app.listen(PORT,async ()=>{
            console.log(`Express Server is listening at ${PORT}`);
            // for(let i=0;i<20;++i){
            //     await generateFakeData(10,1,10);
            // }
        })
    } catch (error) {
        console.log(error);
    }
}

server();