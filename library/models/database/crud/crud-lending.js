"use strict";

const schema = require('../schema/schema-lending');
const CRUD = require('./crud-class');

class LendingCRUD extends CRUD{
    constructor() {
        super('Lending', schema);
    }
    find(callback) {
        this.model.find({}).populate('copy reader').exec((error, docs) => {
            callback(error, docs);
        });
    }

    findByReader(_reader, callback){
    	this.model
    	.find({ reader: _reader })
    	.populate({
    		path: 'copy',
    		populate: { path: 'book' }
 		}).exec((error, docs) => {
            callback(error, docs);
        });
    }
}

module.exports = new LendingCRUD();