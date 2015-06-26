'use strict';

angular.module('myApp')

.config(function($stateProvider) {

  $stateProvider

  .state('users', {
    url: '/users',
    templateUrl: 'app/users/users.html',
    controller: 'UserCtrl'
  });
});