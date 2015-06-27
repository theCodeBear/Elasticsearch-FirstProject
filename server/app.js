'use strict';

var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();


// Elasticsearch stuff
var elasticsearch = require('elasticsearch');
var connectionString = 'localhost:9200';
var client = new elasticsearch.Client({
  host: connectionString,
  log: 'trace'
});
// send a HEAD request to /?hello=elasticsearch
client.ping({
  requestTimeout: 30000,
  //undocumented params are appended to the query string
  hello: 'elasticsearch!'
}, function(err) {
  if (err)
    console.error('elasticsearch cluster is down');
  else
    console.log('all is well with elasticsearch');
});
// use promises to search for something
client.search({
  q: 'pants'
}).then(function(body) {
  var hits = body.hits.hits;
}, function(err) {
  console.trace(err.message);
});
// Tell the elasticsearch client to ignore 404 responses
client.indices.delete({
  index: 'test_index',
  ignore: [404]            // this ignore property needs to be added to whatever client method i want to use it on
}).then(function(body) {
  // since we told the client to ignore 404 errors, the
  // promise is resolved even if the index does not exist
  console.log('index was deleted or never existed');
}, function(err) {
  console.log('some error with elasticsearch');
});
// Simple match query of elasticsearch db
client.search({
  index: 'twitter',
  type: 'tweets',
  body: {
    query: {
      match: {
        body: 'elasticsearch'
      }
    }
  }
}).then(function(res) {
  var hits = res.hits.hits;
}, function(err) {
  console.trace(err.message);
});



// running some basic Express middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + './../client'));


// middleware
var middleware = require('./config/middleware');
app.use(middleware.beforeAll);
app.post('/users', middleware.validateUserName);

// links to the routes file which links to all the individual routes
require('./config/routes')(app);



// connect to mongo
mongoose.connect('mongodb://localhost/expressApp');

// run Express web server
var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Serving on port %s', port);
});

module.exports = app;