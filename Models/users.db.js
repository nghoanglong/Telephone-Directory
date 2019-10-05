var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
});

var listUsers = mongoose.model('listUsers', usersSchema,'users');

module.exports = listUsers;