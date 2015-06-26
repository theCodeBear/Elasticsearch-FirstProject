'use strict';

angular.module('myApp')

.directive('createUser', function(User) {

  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        User.create(scope.user).then(function(data) {
          scope.userIndex = User.mapUsersToNames(data.data.users);
        }).catch(function(data) {
          console.log('error:', data.data);
        }).finally(function() {
          scope.user.name = '';
          document.getElementsByTagName('input')[0].focus(true);
        });
      });
    }
  };

});