var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
});

var usersList = mongoose.model('usersList', usersSchema,'users');

module.exports = usersList;