const schema    = require('../schema/schema-user');
const CRUD      = require('./crud-prototype');
const UserCRUD  = new CRUD('User', schema);

module.exports = UserCRUD;