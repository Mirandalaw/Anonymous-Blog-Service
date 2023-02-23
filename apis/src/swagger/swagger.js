const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        opneapi: "3.0.0",
        info: {
            title: "Restful-Board-example",
            version: '1.0.0',
            description: "RestfulAPI with express",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ['apis/src/routes/*.js', 'apis/src/swagger/*']
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi, specs
};