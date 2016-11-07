const express = require('express');
const CopyCRUD = require('../../models/database/db-interface').CopyCRUD;
const router = express.Router();
const multer = require('multer'); // v1.0.5
const upload = multer();
router
//
    .get('/', function (req, res, next) {
        if (req.query.bookId) {
            CopyCRUD.findByBook(req.query.bookId, (error, docs) => {
                if(error){
                    console.log(error.errors);
                    res.status(500).end();
                    return;
                }
                res.status(200).json(docs);
                
            });
        }
        else {
            CopyCRUD.findAll(function (error, docs) {
                if(error){
                    console.log(error);
                    res.status(500).end();
                    return;
                }
                res.status(200).json(docs);
            });
        }
    })
    //
    .get('/:id', function (req, res, next) {
        CopyCRUD.findById(req.params.id, function (error, docs) {
            if (error) {
                console.log(error);
                res.status(404).end();
                return;
            }
            res.status(200).json(docs[0]);
        });
    })
    //
    .post('/', upload.none(), (req, res) => {
        CopyCRUD.insert(req.body, (error) => {
            if (error) {
                console.log(error);
                res.status(500).end();
                return;
            }
            res.status(200).end();
        });
    })
    //
    .put('/:id', upload.none(), (req, res) => {
        console.log("Id of the object to update: " + req.params.id);
        CopyCRUD.update(req.params.id, req.body, (error, doc) => {
            if (error) {
                console.log(error);
                res.status(500).end();
                return;
            }
            res.status(200).json(doc);
        });
    })
    //
    .delete('/:id', (req, res) => {
        CopyCRUD.delete(req.params.id, (error) => {
            if (error) {
                console.log(error);
                res.status(500).end();
                return;
            }
            res.status(200).end();
        });
    });
module.exports = router;