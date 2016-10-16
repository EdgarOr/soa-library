var mongoose = require('mongoose');

var userSchema = {
    name: { 
        type: String, 
        required: true 
    }, 
    lastname: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    profilePhoto: {
        type: String
    },
    updatedAt: {
        type: Date
    }
};

module.exports = new mongoose.Schema(userSchema);
module.exports.bookSchema = userSchema;