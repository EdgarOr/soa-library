const schema    = require('../schema/schema-book');

const CRUD      = require('./crud-prototype');
const BookCRUD = new CRUD('Book', schema);

BookCRUD.find = function (callback) {
    this.Model.find({}).populate('categories').exec( (error, docs) =>{
        callback(error, docs);
    });
};

module.exports = BookCRUD;