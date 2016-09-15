var mongoose = require('mongoose');

var userSchema = {
    username: { 
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
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
};

module.exports = new mongoose.Schema(userSchema);
module.exports.bookSchema = userSchema;