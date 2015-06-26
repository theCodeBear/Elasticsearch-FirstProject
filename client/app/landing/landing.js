'use strict';

angular.module('myApp')

.config(function($stateProvider) {

  $stateProvider

  .state('landing', {
    url: '/',
    templateUrl: 'app/landing/landing.html'
  });

});
