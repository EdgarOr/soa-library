const schema    = require('../schema/schema-category');

const CRUD      = require('./crud-prototype');
const CategoryCRUD = new CRUD('Category', schema);

CategoryCRUD.find = function (callback) {
    this.Model.find({}).populate('relatedBooks').exec( (error, docs) =>{
        callback(error, docs);
    });
};

module.exports = CategoryCRUD;