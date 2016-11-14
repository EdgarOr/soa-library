var mongoose = require('mongoose');

var states = 'ok damaged incomplete'.split(' ');
var availabilities = 'available unavailable'.split(' ');
var editions = 'First Second Third Fourth Fifth Sixth Seventh Eighth Ninth Tenth'.split(' ');
var languages = 'English Spanish Mandarin Hindi German Russian Japanese'.split(' ');

var copySchema = {
    pages: { type: Number},
    state: {
        type: String,
        enum: states,
        required: true
    },
    availability: {
        type: String,
        enum: availabilities,
        required: true
    },
    edition: {
        type: String,
        enum: editions
    },
    publicatedAt: {type: Date},
    language: {
        type: String,
        enum: languages,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }
};

module.exports = new mongoose.Schema(copySchema);
module.exports.copySchema = copySchema;
