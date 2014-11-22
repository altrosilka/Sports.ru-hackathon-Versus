angular.module('App').directive('sectionPrintedMode', ['$timeout', function($timeout) {
  return {
    scope: {
      mode: '=sectionPrintedMode'
    },
    link: function($scope, $element, $attrs) {
      $scope.$watch('mode', function(print, old) {
        if (!print || !print) return;

        if (print === true) {
          var l = $element.find('.quote-textarea').length;

          if (l === 1) {
            var text = $element.find('.quote-textarea').val();
            var auth = $element.find('.quote-input').val();
            if (text === '' || auth === '') {
              $element.hide();
            }
          } else {
            var t = '',
              i = '';
            $element.find('.quote-textarea').each(function() {
              t += $(this).val();
            });
            $element.find('.quote-input').each(function() {
              i += $(this).val();
            });
            if (t === '' || i === '') {
              $element.hide();
            }
          }
        }
        if (print === false && old === true) {
          $element.show();
        }
      });
    }
  }
}])
