'use strict';

angular.module('elastic')

.config(function($stateProvider) {

  $stateProvider

  .state('elastic', {
    url: '/elastic',
    templateUrl: 'app/elasticsearch/elastic.html',
    controller: 'ElasticCtrl'
  });
});