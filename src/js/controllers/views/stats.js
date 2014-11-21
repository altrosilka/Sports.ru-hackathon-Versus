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



    if ($state.params.tag2) {

      ctr.oneTag = false;

      $q.all({
        tag1: S_api.getTagStat($state.params.tag, $state.params.t, $state.params.s),
        tag2: S_api.getTagStat($state.params.tag2, $state.params.t2, $state.params.s2)
      }).then(function(resp) {
        ctr.preloadingInfo = false;
        var info = ctr.versus;

        info.tag1 = resp.tag1.data;
        info.tag2 = resp.tag2.data;

        info.mainImageIndex = 0;
        info.background_image = S_utils.getVersusBackgrounds();
        info.mainImage = info.background_image[0].url;

        info.tag1.age = moment().diff(moment(info.tag1.birth_date, 'YYYY-MM-DD HH:mm:ss'), 'years');
        info.tag2.age = moment().diff(moment(info.tag2.birth_date, 'YYYY-MM-DD HH:mm:ss'), 'years');


        info.tag1.age += ' ' + S_utils.plural(info.tag1.age, 'год','года','лет');
        info.tag2.age += ' ' + S_utils.plural(info.tag2.age, 'год','года','лет');

        $q.all({
          avatar1: S_utils.loadImage(info.tag1.avatar),
          avatar2: S_utils.loadImage(info.tag2.avatar),
          mainImage: S_utils.loadImage(info.mainImage)
        }).then(function() {
          $timeout(function() {
            ctr.readyToShow = true;
          }, 500);
        });
      });
    } else {
      ctr.oneTag = true;

      $q.all({
        tag: S_api.getTagStat($state.params.tag, $state.params.t, $state.params.s)
      }).then(function(resp) {
        ctr.preloadingInfo = false;


        ctr.solo = resp.tag.data;

        ctr.solo.mainImageIndex = 0;
        ctr.solo.mainImage = ctr.solo.background_image[0].url;

        var date = moment(ctr.solo.birth_date, 'YYYY-MM-DD HH:mm:ss');
        ctr.solo.age = moment().diff(date, 'years');
        ctr.solo.age += ' ' + S_utils.plural(ctr.solo.age, 'год','года','лет');
        ctr.solo.birthdayHuman = date.format('D MMMM YYYY');

        $q.all({
          avatar: S_utils.loadImage(ctr.solo.avatar),
          mainImage: S_utils.loadImage(ctr.solo.mainImage)
        }).then(function() {
          $timeout(function() {
            ctr.readyToShow = true;
          }, 500);
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
      var l = info.background_image.length;

      if (q + 1 < l - 1) {
        info.mainImageIndex++;
      } else {
        info.mainImageIndex = 0;
      }

      info.mainImage = info.background_image[info.mainImageIndex].url;
    }

    ctr.toggleImage = function(key) {
      var info = ctr.getTagInfo(key); 
      info.witoutTopImage = !info.witoutTopImage;
    }

    ctr.witoutBackground = function(key) {
      return ctr.getTagInfo(key).witoutTopImage;
    }

    ctr.sortableOptions = {
      axis: 'y',
      handle: '.reorder'
    }

    ctr.bannedSections = [];

    ctr.sectionIsBanned = function(section) {
      var el = _.find(ctr.bannedSections, function(num) {
        return num === section;
      });
      return el;
    }

    ctr.toggleSection = function(section) {
      var el = _.remove(ctr.bannedSections, function(num) {
        return num === section;
      });

      if (!el || !el.length) {
        ctr.bannedSections.push(section);
      }
    }

    ctr.toHumanMatchDate = function(date){
      return moment(date,'YYYY-MM-DD').format('DD.MM.YYYY');
    }

    ctr.saveImage = function(){
      ctr.savingInProgress = true;
    }

    ctr.thisIsEmptyTimeline = function(tl){
      return _.max(tl, function(e) {
          return e.goals_count;
        }).goals_count === 0;
    }

    return ctr;
  }
]);
