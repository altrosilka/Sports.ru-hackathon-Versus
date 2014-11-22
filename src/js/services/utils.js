angular.module('App')
  .service('S_utils', ['$q', '$modal', '__api', function($q, $modal, __api) {
    var service = {};

    service.loadImage = function(src) {
      var defer = $q.defer();

      var image = new Image();
      image.src = src;
      image.onload = function() {
        defer.resolve(this);
      }
      image.onerror = function() {
        defer.reject(this);
      }

      return defer.promise;
    }

    service.plural = function(number, one, two, five) {
      number = Math.abs(number);
      number %= 100;
      if (number >= 5 && number <= 20) {
        return five;
      }
      number %= 10;
      if (number == 1) {
        return one;
      }
      if (number >= 2 && number <= 4) {
        return two;
      }
      return five;
    }

    service.getVersusBackgrounds = function() {
      return [{
        url: '/images/versus-bg/fvs01.png'
      }, {
        url: '/images/versus-bg/fvs02.png'
      }, {
        url: '/images/versus-bg/fvs03.png'
      }, {
        url: '/images/versus-bg/fvs04.png'
      }, {
        url: '/images/versus-bg/fvs05.png'
      }, {
        url: '/images/versus-bg/fvs06.png'
      }, {
        url: '/images/versus-bg/fvs07.png'
      }];
    }

    service.openSharePopup = function(url, title, w, h) {
      w = w || 900;
      h = h || 600;
      var left = (screen.width / 2) - (w / 2);
      var top = (screen.height / 2) - (h / 2);
      return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    }

    service.openCopyPopup = function(url) {
      $modal.open({
        templateUrl: 'templates/other/copyLink.html',
        controller: 'CM_copy as ctr',
        size: 'md',
        resolve: {
          url: function() {
            return url;
          }
        }
      });
    }

    service.getContrastColor = function(hex) {
      return (luma(hex) >= 165) ? '000' : 'fff';
    }

    return service;

    function luma(color) {
      var rgb = (typeof color === 'string') ? hexToRGBArray(color) : color;
      return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]);
    }

    function hexToRGBArray(color) {
      if (color.length === 3)
        color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
      else if (color.length !== 6)
        throw ('Invalid hex color: ' + color);
      var rgb = [];
      for (var i = 0; i <= 2; i++)
        rgb[i] = parseInt(color.substr(i * 2, 2), 16);
      return rgb;
    }


  }]);
