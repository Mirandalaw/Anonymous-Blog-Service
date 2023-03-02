const express = require('express');
const { userRouter, blogRouter } = require('./routes');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const yaml = require('yamljs');

const app = express();
const swaggerYaml = yaml.load(path.join(__dirname, './swagger/board-1.0.0.yaml'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml));

app.use('/user', userRouter);
app.use('/blog', blogRouter);

module.exports = app;