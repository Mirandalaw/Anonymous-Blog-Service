const express = require('express');
const mongoose = require('mongoose');
const { userRouter, blogRouter } = require('./routes');
const { generateFakeData } = require('../../faker2');
require('dotenv').config();

const app = express();
const server = async () => {
    try {
        const { MONGO_URI, PORT } = process.env;
        if (!MONGO_URI) throw new Error("MONGO_URI is required");
        if (!PORT) throw new Error("PORT is required");
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGO_URI, {});
        // mongoose.set('debug',true);

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use('/user', userRouter);
        app.use('/blog', blogRouter);

        app.listen(PORT, async () => {
            console.log(`Express Server is listening at ${PORT}`);
            // await generateFakeData(10,2,10);
        })
    } catch (error) {
        console.log(error);
    }
}

server();