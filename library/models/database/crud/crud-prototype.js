const mongoose  = require('mongoose');

function CRUD(model, schema){
    this.Model = mongoose.model(model, schema);
}

CRUD.prototype.find = function (callback) {
    this.Model.find({}, (error, docs) =>{
        callback(error, docs);
    });
};

CRUD.prototype.insert = function (doc, callback) {
    console.log(this.Model);
    new this.Model(doc).save(callback);
};

CRUD.prototype.update = function (id, doc, callback) {
    this.Model.update({_id: id}, doc, callback);
};

CRUD.prototype.delete = function (id, callback) {
    this.Model.remove({_id: id}, callback);
};

module.exports = CRUD;