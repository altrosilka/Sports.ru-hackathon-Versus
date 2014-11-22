angular.module('App').directive('customSortingList', [function() {
  return {
    scope: {
      whenClick: '&',
      setNewList: '&',
      list:'=customSortingList',
      time: '=collectParam'
    },
    link: function($scope, $element, $attrs) {
      $scope.$watch('time', function(t) {
        if (!t) return;
        collect();
      });

      $scope.$watch('list', function(t) {
        if (!t || watched) return;
        watched = true;
        
        var table = $element.find('.table');
        var els = table.find('.stata');
        _.forEachRight(t,function(el){
          var q = els.filter('[data-panel-id="'+el+'"]');
          console.log(el,q);
          q.prependTo(table);
        });
      });

      var watched = false;

      function collect() {
        var array = [];
        $element.find('.stata').each(function(){
          array.push($(this).attr('data-panel-id'));
        });
        $scope.setNewList({list: array});
      }

    }
  }
}])
