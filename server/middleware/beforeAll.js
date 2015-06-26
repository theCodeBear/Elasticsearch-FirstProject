'use strict';

module.exports = function(req, res, next) {
  console.log('this gets printed before all requests to the back end');
  next();
};