'use strict';

var User = require('../../models/user');

module.exports = function(req, res) {
  User.find({}, function(err, users) {
    res.send({users: users});
  });
};