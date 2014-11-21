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
    ctr.firstTagInfo = {};
    ctr.secondTagInfo = {};

    var loadingObj = {
      tag: S_api.getTagStat($state.params.tag)
    }

    if ($state.params.tag2) {
      loadingObj.tag2 = $state.params.tag2;
    }

    $q.all(loadingObj).then(function(resp) {
      ctr.preloadingInfo = false;

      if (resp.tag) {
        ctr.firstTagInfo = resp.tag;

        ctr.firstTagInfo.mainImageIndex = 0;
        ctr.firstTagInfo.mainImage = resp.tag.background_images[0];

        var date = moment(resp.tag.birth_date, 'YYYY-MM-DD HH:mm:ss');
        ctr.firstTagInfo.age = moment().diff(date, 'years');
        ctr.firstTagInfo.birthdayHuman = date.format('D MMMM YYYY');
      }


      $q.all({
        avatar: S_utils.loadImage(ctr.firstTagInfo.avatar),
        mainImage: S_utils.loadImage(ctr.firstTagInfo.mainImage)
      }).then(function() {
        ctr.readyToShow = true;
      })

    });

    ctr.getTagInfo = function(key) {
      return ((!key) ? ctr.firstTagInfo : ctr.secondTagInfo);
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

      info.mainImage = info.background_images[ctr.firstTagInfo.mainImageIndex];
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
