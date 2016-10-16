const mongoose = require('mongoose');
module.exports = class CRUD {
    
        constructor(modelName, schema) {
            this.model = mongoose.model(modelName, schema);
        }
    
        findAll(callback) {
            this.model.find({}, (error, docs) => {
                callback(error, docs);
            });
        }
        findById(id, callback) {
            this.model.find({
                _id: id
            }, (error, doc) => {
                callback(error, doc);
            });
        }
        insert(doc, callback) {
            new this.model(doc).save(callback);
        }
        update(id, doc, callback) {
            this.model.update({
                _id: id
            }, doc, callback);
        }
        delete(id, callback) {
            this.model.remove({
                _id: id
            }, callback);
        }
    }
    /*
    function CRUD(model, schema) {
        this.Model = mongoose.model(model, schema);
    }
    CRUD.prototype.find = function (callback) {
        this.Model.find({}, (error, docs) => {
            callback(error, docs);
        });
    };
    CRUD.prototype.insert = function (doc, callback) {
        console.log(this.Model);
        new this.Model(doc).save(callback);
    };
    CRUD.prototype.update = function (id, doc, callback) {
        this.Model.update({
            _id: id
        }, doc, callback);
    };
    CRUD.prototype.delete = function (id, callback) {
        this.Model.remove({
            _id: id
        }, callback);
    };
module.exports = CRUD;
    */
