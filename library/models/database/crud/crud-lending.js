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
    };
}

module.exports = new LendingCRUD();