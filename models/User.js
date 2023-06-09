const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//User Schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
    },
    registerDate: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString(),
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
    {
        methods:{
            comparePassword  (){

            }
        }
    }
);

//Before saved, hashed password
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});

//Compare password
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = model('User', userSchema);
module.exports = User;