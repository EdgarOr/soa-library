"use strict";

const schema = require('../schema/schema-copy');
const CRUD = require('./crud-class');
class CopyCRUD extends CRUD {
    constructor() {
        super('Copy', schema);
    }
    findAll(callback) {
        this.model.find({}).populate('book').exec((error, docs) => {
            callback(error, docs);
        });
    }
    findByBook(bookId, callback) {
        this.model.find({
            book: bookId
        }, (error, doc) => {
            callback(error, doc);
        });
    }
    findById(id, callback) {
        this.model.find({
            _id: id
        }, (error, doc) => {
            callback(error, doc);
        }).populate('book');
    }
}
module.exports = new CopyCRUD();