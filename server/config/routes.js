'use strict';

var User = require('./../models/user');

module.exports = function(app) {
  app.get('/users', require('./../routes/user/index'));
  app.post('/users', require('./../routes/user/create'));
};