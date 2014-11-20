angular.module('App').controller('CD_autocompleteArea', ['$scope', 'S_api', function($scope, S_api) {
  var ctr = this;

  ctr.searchByQuery = function(val) {
    return S_api.searchByQuery(val).then(function(response) {
      return response.data.suggestions; 
    });
  }

  ctr.onTagSelect = function(item, model, label){
    $scope.info = item;
  }

  return ctr;
}]);
 