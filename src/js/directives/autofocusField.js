angular.module('App').directive('autofocusField', ['$timeout',function($timeout) {
  return {
    scope: {},
    link: function($scope, $element, $attrs) {
      $timeout(function() {
        $element.find('input').trigger('focus');
      }, 0);
    }
  }
}])
