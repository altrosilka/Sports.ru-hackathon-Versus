angular.module('App').controller('CV_stats', [
  '$state',
  '$timeout',
  '$q',
  '$scope',
  'S_api',
  'S_utils',
  'S_location',
  function($state, $timeout, $q, $scope, S_api, S_utils, S_location) {
    var ctr = this;


    var color1 = $state.params.c,
      color2 = $state.params.c2;

    ctr.preloadingInfo = true;
    ctr.solo = {};
    ctr.versus = {};

    ctr.yearsPlural = {
      0: '',
      one: '{} год',
      few: '{} года',
      many: '{} лет',
      other: '{} года'
    };

    if ($state.params.tag2) {

      ctr.oneTag = false;

      $q.all({
        tag1: S_api.getTagStat($state.params.tag),
        tag2: S_api.getTagStat($state.params.tag2)
      }).then(function(resp) {
        ctr.preloadingInfo = false;
        var info = ctr.versus;

        info.tag1 = resp.tag1;
        info.tag2 = resp.tag2;

        info.mainImageIndex = 0;
        info.background_images = S_utils.getVersusBackgrounds();
        info.mainImage = info.background_images[0];

        info.tag1.age = moment().diff(moment(info.tag1.birth_date, 'YYYY-MM-DD HH:mm:ss'), 'years');
        info.tag2.age = moment().diff(moment(info.tag2.birth_date, 'YYYY-MM-DD HH:mm:ss'), 'years');


        $q.all({
          avatar1: S_utils.loadImage(info.tag1.avatar),
          avatar2: S_utils.loadImage(info.tag2.avatar),
          mainImage: S_utils.loadImage(info.mainImage)
        }).then(function() {
          $timeout(function() {
            ctr.readyToShow = true;
          }, 200);
        });
      });
    } else {
      ctr.oneTag = true;

      $q.all({
        tag: S_api.getTagStat($state.params.tag)
      }).then(function(resp) {
        ctr.preloadingInfo = false;

        if (resp.tag) {
          ctr.solo = resp.tag;

          ctr.solo.mainImageIndex = 0;
          ctr.solo.mainImage = resp.tag.background_images[0];

          var date = moment(resp.tag.birth_date, 'YYYY-MM-DD HH:mm:ss');
          ctr.solo.age = moment().diff(date, 'years');
          ctr.solo.birthdayHuman = date.format('D MMMM YYYY');
        }

        $q.all({
          avatar: S_utils.loadImage(ctr.solo.avatar),
          mainImage: S_utils.loadImage(ctr.solo.mainImage)
        }).then(function() {
          $timeout(function() {
            ctr.readyToShow = true;
          }, 200);
        });
      });
    }



    ctr.getTagInfo = function(key) {
      return ((typeof key === 'number') ? ((!key) ? ctr.versus.tag1 : ctr.versus.tag2) : key);
    }

    ctr.getColor = function(key) {
      return ('#' + ((!key) ? color1 : color2));
    }

    ctr.getTextColor = function(key) {
      return ('#' + S_utils.getContrastColor(((!key) ? color1 : color2)));
    }

    ctr.setColor = function(color, key) {
      $scope.$apply(function() {
        if (!key) {
          color1 = color;
          S_location.setAttr('c', color)
        } else {
          color2 = color;
          S_location.setAttr('c2', color);
        }

      });
    }

    ctr.nextTagImage = function(key) {
      var info = ctr.getTagInfo(key);
      var q = info.mainImageIndex;
      var l = info.background_images.length;

      if (q + 1 < l - 1) {
        info.mainImageIndex++;
      } else {
        info.mainImageIndex = 0;
      }

      info.mainImage = info.background_images[info.mainImageIndex];
    }

    ctr.toggleImage = function(key) {
      var info = ctr.getTagInfo(key);
      info.witoutTopImage = !info.witoutTopImage;
    }

    ctr.witoutBackground = function(key) {
      return ctr.getTagInfo(key).witoutTopImage;
    }

    return ctr;
  }
]);
