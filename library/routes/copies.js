const express     = require('express');
const CopyCRUD = require('../models/database/db-interface').CopyCRUD;
const router      = express.Router();
const multer = require('multer'); // v1.0.5
const upload = multer();

/* GET users listing. */
router.get('/', function(req, res, next) {
    CopyCRUD.find(function(error, docs){
        res.status(200).json(docs);
    });
});

router.post('/', upload.none(), (req, res) =>{
    
    CopyCRUD.insert(req.body, (error) =>{
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
    CopyCRUD.update(req.params.id, req.body, (error, doc) =>{
        if(error){
            console.log(error);
            res.status(500).end();
            return;
        }
        res.status(200).json(doc);
    } );
});

router.delete('/:id', (req, res) =>{
    CopyCRUD.delete(req.params.id, (error) => {
        if(error){
            console.log(error);
            res.status(500).end();
            return;
        }
         res.status(200).end();
    });
});

module.exports = router;