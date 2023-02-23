const express = require('express');
const { userRouter, blogRouter } = require('./routes');
const { swaggerUi, specs } = require('./swagger/swagger');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/user', userRouter);
app.use('/blog', blogRouter);

module.exports = app;