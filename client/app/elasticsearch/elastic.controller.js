'use strict';

angular.module('elastic')

.controller('ElasticCtrl', function($scope, $http) {

  $scope.showAll = function() {
    // $http.get('')
  };

  // search db
  $scope.search = function() {

  };

  // post to db
  $scope.saveAnimal = function(animal) {
    animal.createdAt = moment().format();
    console.log(animal)
    $http.post('http://localhost:9200/animal/', animal).then(function(res) {
      console.log('post to elasticsearch was a SUCCESS', res);
    }).catch(function(err) {
      console.log('post to elasticsearch FAILED', err);
    });
  };

});