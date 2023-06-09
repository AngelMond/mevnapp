'use strict'
require('dotenv').config();
const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
// const mongoURI = 'mongodb://127.0.0.1:27017/keyence';
//const mongoURI = process.env.MONGO_URI;
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dvvtimu.mongodb.net`;


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;