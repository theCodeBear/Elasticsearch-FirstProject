'use strict';

angular.module('myApp')

.controller('UserCtrl', function($scope, User) {

  User.getUserNames().then(function(userArray) {
    $scope.userIndex = userArray;
  });

});