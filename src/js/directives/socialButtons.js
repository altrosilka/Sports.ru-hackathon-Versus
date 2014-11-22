angular.module('App').directive('socialButtons', [function() {
  return {
    scope: {
      whenClick: '&'
    },
    templateUrl: 'templates/directives/socialButtons.html',
    link: function($scope, $element, $attrs) {
      $element.find('.button').on('click',function(){
        var type = $(this).attr('data-type');
        $scope.whenClick({type:type});
      });
    }
  }
}])
