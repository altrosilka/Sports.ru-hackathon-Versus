angular.module('App')
  .directive('setBgOnLoad', ['$timeout', 'S_utils', function($timeout, S_utils) {
    return {
      scope: {
        src: '=setBgOnLoad',
        newLayer: '=',
        listen: '='
      },
      link: function($scope, $element) {
        var layer;

        if (!$scope.newLayer) {
          layer = $(document.createElement('div')).addClass('layer').appendTo($element);
        }

        $scope.$watch('src', function(newSrc) {
          if (!newSrc) {
            return;
          }
          $element.removeClass('active');

          var animationTime = 600;


          var promise = S_utils.loadImage($scope.src);

          var time1 = new Date().getTime();

          if ($scope.newLayer) {
            promise.then(function(img) {
              
              var oldLayers = $element.find('.layer');
              var layer = $(document.createElement('div')).addClass('layer').css({
                "background-image": "url(" + $scope.src + ")"
              }).appendTo($element);

              if ($scope.listen && img.width/img.height <1.3673469387755102){
                layer.css('background-size','100%');
              }

              $timeout(function() {
                layer.addClass('active');
              }, 100);
              $timeout(function() {
                oldLayers.remove();
              }, animationTime);
            });
          } else {
            promise.then(function() {
              var time2 = new Date().getTime();

              if (time2 - time1 < animationTime) {
                $timeout(function() {
                  layer.css({
                    'background-image': 'url(' + $scope.src + ')'
                  }).addClass('active');
                }, (animationTime - (time2 - time1)));
              } else {
                layer.css({
                  'background-image': 'url(' + $scope.src + ')'
                }).addClass('active');
              }
            });
          }

        });
      }
    }
  }]);
