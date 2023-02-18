const app = require('../index');
const mongoClient = require('../bin/mongoClient');
const { generateFakeData } = require('../../../faker2');

require('dotenv').config();

const server = async () => {
    try {
        const { PORT } = process.env;
        if (!PORT) throw new Error("PORT is required");
        mongoClient.mongoConnect();

        app.listen(PORT, async () => {
            console.log(`Express Server is listening at ${PORT}`);
            // await generateFakeData(10,2,10);
        })
    } catch (error) {
        console.log(error);
    }
}

server();