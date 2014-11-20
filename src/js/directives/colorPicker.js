angular.module('App').directive('colorPicker', [function() {
  return {
    scope: {},
    link: function($scope, $element, $attrs) {
      $element.ColorPickerSliders({
        placement: 'right',
        hsvpanel: true,
        sliders: false,
        swatches: false,
        previewformat: 'hex'
      });
    }
  }
}])
