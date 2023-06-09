const { Schema, model } = require('mongoose');

//UsersCheck Schema
const usersCheckSchema = new Schema({
    userId: {
        type: String, 
        unique: false, 
        required: true, 
        trim: true
    },
    username: {
        type: String, 
        unique: false, 
        required: true, 
        trim: true
    },
    date: {
        type: String, 
        required: true,
        trim: true,
    }, 
    punchIn:{
        type: String,
        required: true,
    },
    punchOut:{
        type: String,
        required: true,
    },    
    },
    {
    toJSON: {
        getters: true,
        },
        id: false,
    }
);

const UsersCheckSchema = model('UsersCheck', usersCheckSchema );
module.exports = UsersCheckSchema;