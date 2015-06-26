'use strict';

var User = require('../../models/user');

module.exports = function(req, res) {
  var user = new User(req.body);
  user.save(function(err, dbUser) {
    User.find({}, function(err, users) {
      res.send({users: users});
    });
  });
};