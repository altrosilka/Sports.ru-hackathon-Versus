angular.module('App').directive('colorPicker', [function() {
  return {
    scope: {
      color: '=colorPicker',
      colorChange: '&',
      tagNum: '='
    },
    link: function($scope, $element, $attrs) {

      $scope.$watch(function() {
        return $scope.color;
      }, function(color) {
        if (!color || $element.hasClass('pickerIsInited')) return;

        $element.addClass('pickerIsInited').val(color).ColorPickerSliders({
          placement: $attrs.placement || 'right',
          hsvpanel: true,
          sliders: false,
          swatches: false,
          previewformat: 'hex',
          onchange: function(container, color){
            if (typeof $scope.colorChange === 'function'){
              var colorStr = $element.val().replace('#','');
              $scope.colorChange({
                color: colorStr,
                key: $scope.tagNum
              });
            }
          } 
        });
      });

    }
  }
}])
