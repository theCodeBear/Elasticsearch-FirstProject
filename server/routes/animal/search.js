'use strict';

var client = require('../../app').client;

module.exports = function(req, res) {
  console.log('body', req.body);
  console.log('query', req.query);
  console.log('params', req.params);

  // client.count({
  //   index: 'animals'
  // }, function(err, resp) {
  //   if (err) return res.send(err);
  //   console.log('resp', resp);
  //   return res.send(resp);
  // });

  client.search({
    index: 'animals',
    type: 'species',
    // size: 10,
    body: {
      query: {
        // matchAll: {}
        match: {
          name: req.query.animal
        }
      }
    }
  }).then(function(result) {
    console.log('result\n', result);
    res.send(result.hits.hits);
  }).catch(function(err) {
    res.send(err);
  });
};