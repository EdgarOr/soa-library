const express   = require('express');
const BookCRUD  = require('../models/database/db-interface').BookCRUD;
const router    = express.Router();
const multer    = require('multer'); // v1.0.5
const upload    = multer();

/* GET users listing. */
router.get('/', function(req, res, next) {
    BookCRUD.find(function(error, docs){
        res.status(200).json(docs);
    });
});

router.post('/', upload.none(), (req, res) =>{
    
    BookCRUD.insert(req.body, (error) =>{
        if(error){
            console.log(error);
            res.status(500).end();
            return;
        }
        res.status(200).end();
    } );
});

router.put('/:id', upload.none(), (req, res) =>{
    console.log("Id of the object to update: " + req.params.id);
    BookCRUD.update(req.params.id, req.body, (error, doc) =>{
        if(error){
            console.log(error);
            res.status(500).end();
            return;
        }
        res.status(200).json(doc);
    } );
});

router.delete('/:id', (req, res) =>{
    BookCRUD.delete(req.params.id, (error) => {
        if(error){
            console.log(error);
            res.status(500).end();
            return;
        }
         res.status(200).end();
    });
});

module.exports = router;