'use strict';

var client = require('../../app').client;

module.exports = function(req, res) {
  console.log('body', req.body);
  client.index({
    index: 'animals',
    type: 'species',
    body: {
      name: req.body.animal.name,
      class: req.body.animal.class,
      createdAt: req.body.animal.createdAt
    }
  }, function(err, resp) {
    if (err) return res.send(err);
    client.indices.refresh();
    return res.send(resp);
  });
  // res.status(200).end();
};