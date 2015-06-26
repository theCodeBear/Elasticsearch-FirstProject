'use strict';

var mongoose = require('mongoose');
var User;


var userSchema = new mongoose.Schema({
  name: { type: String, required: true }
});


var User = mongoose.model('User', userSchema);
module.exports = User;