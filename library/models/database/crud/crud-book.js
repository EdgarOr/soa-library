"use strict";

const schema = require('../schema/schema-book');
const CRUDClass = require('./crud-class');

class BookCRUD extends CRUDClass {
    constructor() {
        super('Book', schema);
    }
    findAll(callback) {
        this.model.find({}).populate('categories').exec((error, docs) => {
            callback(error, docs);
        });
    };
    
    findById(bookId, callback){
        this.model.find({_id: bookId}).populate('categories').exec((error, docs) =>{
           callback(error, docs); 
        });
    }
}

module.exports = new BookCRUD();
    /*
    const CRUD      = require('./crud-prototype');
    const BookCRUD = new CRUD('Book', schema);

    BookCRUD.find = function (callback) {
        this.Model.find({}).populate('categories').exec( (error, docs) =>{
            callback(error, docs);
        });
    };

    module.exports = BookCRUD;

    */