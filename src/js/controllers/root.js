angular.module('App').controller('C_root', ['$scope', '$timeout', 'S_api', function($scope, $timeout, S_api) {
  var ctr = this;


  

  $scope.$on('goSearch', function() {
    ctr.hideView = true;
    $timeout(function() {
      ctr.lowIndex = true;
      ctr.hidePlayers = true;
      $timeout(function() {
        ctr.hideView = false;
      });
    }, 250);

  });

  return ctr;
}]);
