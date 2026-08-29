require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5001,
    MongoDBURL: process.env.MONGODB_URI,
    CLIENT_URL: process.env.CLIENT_URL || "*"
};
