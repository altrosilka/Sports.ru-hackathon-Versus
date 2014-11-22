angular.module('App').directive('imageSaveArea', ['$timeout', function($timeout) {
  return {
    scope: {
      save: '=imageSaveArea',
      complete: '=afterSaving'
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
              $timeout(function() {
                canvas.toBlob(function(blob) {
                  saveAs(blob, "sports_ru_stat_" + Math.random().toString(36).substring(13) + ".png");
                  if (typeof $scope.complete === 'function') {
                    $scope.complete();
                  }
                });
              },500);
            }
          });
        }
      });
    }
  }
}])
