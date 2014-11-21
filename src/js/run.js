angular.module('App').run([
  '$rootScope',
  function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      $rootScope.state = toState.name;
    });

  }
]);
