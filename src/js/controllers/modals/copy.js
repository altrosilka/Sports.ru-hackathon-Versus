angular.module('App').controller('CM_copy', ['$scope', 'url', function($scope, url) {
  var ctr = this;
  ctr.url = url;
  return ctr;
}]);
