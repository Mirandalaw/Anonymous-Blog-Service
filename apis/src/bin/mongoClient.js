const mongoose = require('mongoose');
require('dotenv').config();
const mongoConnect = async () => {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error("MONGO_URI is required");
    mongoose.set("strictQuery", false);
    // mongoose.set('debug',true);
    await mongoose.connect(MONGO_URI, {});
}
module.exports = { mongoConnect };

