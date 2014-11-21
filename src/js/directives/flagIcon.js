angular.module('App').directive('flagIcon', [function() {
  return {
    scope: {
      flag: '=flagIcon'
    },
    link: function($scope, $element, $attrs) {
      $scope.$watch('flag',function(val){
        if(!val) return;
        
        $element.addClass('flag-icon-'+val);
      });
      
    }
  }
}])
