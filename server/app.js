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