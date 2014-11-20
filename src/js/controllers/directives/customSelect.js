angular.module('App')
  .controller('CD_customSelect', [
    '$timeout',
    '$scope',
    '$interpolate', 
    '$sce',
    function($timeout, $scope, $interpolate, $sce) {
      var ctr = this;
      $scope.length = 123;

      $scope.$watch('sectionFormat', function() {
        $scope.section = $sce.trustAsHtml($interpolate('<span>' + $scope.sectionFormat + '</span>')($scope));
      });
 
      ctr.close = function() {
        ctr.opened = false;
        $('body').off('click');
      }

      ctr.open = function() {
        ctr.opened = !ctr.opened;
        
        if (ctr.opened) {
          $timeout(function() {
            $('body').on('click', function(event) {

              $scope.$apply(function() {
                ctr.opened = false;
              });
              $(this).off('click');
            });
          });
        } else {
          $('body').off('click');
        }
      }

      ctr.isDisabled = function(option) {
        if (!$scope.optionDisabled()) {
          return;
        }
        return $scope.optionDisabled()(option, $scope.selectId);
      }

      ctr.isActive = function(option) {
        if (!$scope.optionActive()) {
          return;
        }
        return $scope.optionActive()(option, $scope.selectId);
      }

      ctr.selectOption = function($event, option) {
        $event.stopPropagation();
        $scope.selected = option;
        //$scope.onSelect()(option, $scope.selectId);

        //$scope.section = $sce.trustAsHtml($interpolate('<span>'+$scope.sectionFormat+'</span>')($scope));

        if ($scope.closeOnSelect) {
          ctr.open();
        }
      }

      return ctr;
    }
  ]);
