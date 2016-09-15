var mongoose = require('mongoose');

var states = 'ok damaged incomplete'.split(' ');

var copySchema = {
    pages: { type: Number},
    state: {
        type: String,
        enum: states,
        required: true
    },
    publication_date: {type: Date},
    language: {type: String},
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }
};

module.exports = new mongoose.Schema(copySchema);
module.exports.copySchema = copySchema;
