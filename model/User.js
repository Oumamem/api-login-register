const { maxHeaderSize } = require('http');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required:true,
        min:6

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