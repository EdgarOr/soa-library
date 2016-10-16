const express = require('express');
const router = express.Router();
/* GET users listing. */
router.get('/book', function (req, res, next) {
    res.render('admin/index');
}).get('/book/new', function (req, res, next) {
    res.render('admin/book-new');
}).get('/book/list', function (req, res, next) {
    res.render('admin/book-list');
}).get('/category/new', function (req, res, next) {
    res.render('admin/category-new');
}).get('/category/list', function (req, res, next) {
    res.render('admin/category-list');
}).get('/user/new', function (req, res, next) {
    res.render('admin/user-new');
}).get('/user/list', function (req, res, next) {
    res.render('admin/user-list');
}).get('/user/lending', function (req, res, next) {
    res.render('admin/book-lending');
});
module.exports = router;