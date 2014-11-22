angular.module('App').directive('manyPeoples', [function() {
  return {
    scope: {
      animate: '='
    },
    templateUrl: 'templates/directives/manyPeoples.html',
    link: function($scope, $element, $attrs) {

      var l = 99;

      var imageSize = 48;

      var wh = $(window).height();
      var ww = $(window).width();

      var $collector = $element.find('[data-role="collector"]');

      var c = Math.ceil(ww / imageSize) + 2;
      var cb = Math.ceil(wh / imageSize) + 2;
      var count = c * cb;
      var nw = c * imageSize;
      var nh = cb * imageSize;

      var str = '';
      for (var i = 0; i < count; i++) {
        str += '<div class="player" style="background-image: url(images/faces/' + (i % l + 1) + '.jpeg)"><span></span></div>';
      }


      $scope.$watch('animate', function(q) {
        if (q === true) {
          $collector.find('.player').each(function(i) {
            var q = $(this).css('transition', (Math.random() * 1000 + 2200) + 'ms');

              q.addClass('go');
       
          });
        }
      });

      $collector.css({
        'width': nw + 'px',
        'height': nh + 'px',
        'top': '-24px',
        'left': '-24px',
      }).html(str);

    }
  }
}])
