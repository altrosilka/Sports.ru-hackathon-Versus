angular.module('App').directive('imageSaveArea', [function() {
  return {
    scope: {
      save: '=imageSaveArea'
    },
    link: function($scope, $element, $attrs) {
      $scope.$watch('save', function(val) {
        if (!val) return;
        var dom = $element.get(0);
        var w = $element.width() * 2;
        var h = $element.height();
        if (val === true) {
          html2canvas(dom, {
            width: w,
            useCORS: true,
            onrendered: function(canvas) {
              canvas.toBlob(function(blob) {
                saveAs(blob, "stats.png");
              });
            }
          });
        }
      });

    }
  }
}])
