var mongoose = require('mongoose');

var lendingSchema = {
    copy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Copy', 
        required: true 
    }, 
    reader: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    return_date: {
        type: Date,
        required: true
    }
};

module.exports = new mongoose.Schema(lendingSchema);
module.exports.bookSchema = lendingSchema;
