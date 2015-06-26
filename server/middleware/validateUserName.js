'use strict';

module.exports = function(req, res, next) {
  if (req.body.name.length > 2) {
    next();
  } else {
    res.status(400).send('Username payload did not pass server validation');
  }
};