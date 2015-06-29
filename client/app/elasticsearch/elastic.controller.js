'use strict';

angular.module('elastic')

.controller('ElasticCtrl', function($scope, $http) {

  $scope.showAll = function() {
    // $http.get('')
  };

  // search db
  $scope.search = function() {
    $http.get('animals/search?animal='+$scope.search.animal).then(function(data) {
      console.log('SUCCESS:', data);
      $scope.animals = data.data;
    }).catch(function(err) {
      console.log('ERROR', err);
    });
  };

  // post to db
  $scope.saveAnimal = function(animal) {
    animal.createdAt = moment().format();
    console.log(animal);
    $http.post('/animals', {animal: animal}).then(function(res) {
      console.log('post to elasticsearch was a SUCCESS', res);
    }).catch(function(err) {
      console.log('post to elasticsearch FAILED', err);
    });
    // $http.post('http://localhost:9200/animal/', animal).then(function(res) {
    //   console.log('post to elasticsearch was a SUCCESS', res);
    // }).catch(function(err) {
    //   console.log('post to elasticsearch FAILED', err);
    // });
  };

});