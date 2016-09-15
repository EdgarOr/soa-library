const schema    = require('../schema/schema-copy');

const CRUD      = require('./crud-prototype');
const CopyCRUD = new CRUD('Copy', schema);

CopyCRUD.find = function (callback) {
    this.Model.find({}).populate('book').exec( (error, docs) =>{
        callback(error, docs);
    });
};

module.exports = CopyCRUD;