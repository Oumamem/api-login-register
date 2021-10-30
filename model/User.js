const { maxHeaderSize } = require('http');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true

    },
    password: {
        type: String,
        required: true,
        max: 150,
        min: 6
    },
    time : { 
        type : Date,
        default: Date.now 
    }
})
module.exports= mongoose.model('User', userSchema)