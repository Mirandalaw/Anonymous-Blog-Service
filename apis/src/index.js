const express = require('express');
const { userRouter, blogRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/blog', blogRouter);

module.exports = app;