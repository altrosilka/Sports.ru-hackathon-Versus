angular.module('App').directive('manyPeoples', ['$timeout', '__storagePath', function($timeout, __storagePath) {
  return {
    scope: {
      animate: '='
    },
    templateUrl: 'templates/directives/manyPeoples.html',
    link: function($scope, $element, $attrs) {


      var _multi = 120; // 80
      var _diff = 120; // 130

      var l = 99;
      var stopAnimate = false;

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
        str += '<div class="player" style="background-image: url('+__storagePath+'images/faces/' + (i % l + 1) + '.jpeg)"><span></span></div>';
      }


      $scope.$watch('animate', function(q) {
        if (q === true) {
          $collector.find('.player').each(function(i) {
            var q = $(this).css('transition', (Math.random() * 1000 + 2200) + 'ms');
            $timeout(function() {
              $element.remove();
            }, 2000);

            q.addClass('go');
            stopAnimate = true;
          });
        }
      });



      function animate() {
        if (stopAnimate) {
          return;
        }

        var line = Math.floor(Math.random() * c);

        for (var i = 0; i < cb; i++) {
          doSetTimeout(i, line);
        }

        $timeout(animate, 80);
      }

      function doSetTimeout(i, line) {
        var active = $players.eq(line + c * i);


        $timeout(function() {
          active.addClass('p');
        }, i * _multi);

        $timeout(function() {
          active.removeClass('p').addClass('b');
        }, i * _multi + _diff * 1);

        $timeout(function() {
          active.removeClass('b').addClass('g');
        }, i * _multi + _diff * 2);

        $timeout(function() {
          active.removeClass('g').addClass('y');
        }, i * _multi + _diff * 3);

        $timeout(function() {
          active.removeClass('y').addClass('r');
        }, i * _multi + _diff * 4);

        $timeout(function() {
          active.removeClass('r');
        }, i * _multi + _diff * 5);
      }


      $timeout(animate, 2000)


      $collector.css({
        'width': nw + 'px',
        'height': nh + 'px',
        'top': '-24px',
        'left': '-24px',
      }).html(str);
      var $players = $collector.find('.player');
    }
  }
}])
