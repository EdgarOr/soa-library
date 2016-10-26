var mongoose = require('mongoose');

var bookSchema = {
    isbn: { type: String, required: true },
    title: {type: String, required: true},
    author: {type: String, required: true},
    editorial: {type: String},
    description: {type: String},
    cover_photo: {type: String, default: '/public/images/covers/generic-book-cover.jpg'},
    categories: [{type: mongoose.Schema.Types.ObjectId, ref:'Category'}]
};

module.exports = new mongoose.Schema(bookSchema);
module.exports.bookSchema = bookSchema;
