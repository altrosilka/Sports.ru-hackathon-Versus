angular.module('App').controller('CV_stats', [
  '$state',
  '$timeout',
  '$q',
  '$scope',
  'S_api',
  'S_utils',
  'S_location',
  '__footerSlogan',
  '__introDomain',
  '__footerSlogan',
  function($state, $timeout, $q, $scope, S_api, S_utils, S_location, __footerSlogan, __introDomain, __footerSlogan) {
    var ctr = this;

    var color1 = $state.params.c,
      color2 = $state.params.c2;

    ctr.preloadingInfo = true;
    ctr.solo = {};
    ctr.versus = {};


    var storedLocation = {
      tag: $state.params.tag,
      tag2: $state.params.tag2,
      c: $state.params.c,
      c2: $state.params.c2,
      t: $state.params.t,
      t2: $state.params.t2,
      s: $state.params.s,
      s2: $state.params.s2
    }



    var defer = $q.defer();
    defer.resolve(storedLocation);
    var promise = defer.promise;

    if ($state.params.info) {

      ctr.observerMode = ctr.saveDocMode = true;

      var defer = $q.defer();
      promise = defer.promise;

      S_api.getLocationStateById($state.params.info).then(function(data) {
        if (data.data.info === false){
          $state.go('^.index');
          return;
        }
        var obj = JSON.parse(data.data.info);
        var storedLocation = {};
        storedLocation.tag = obj.tag;
        storedLocation.c = color1 = obj.c;
        storedLocation.t = obj.t;
        storedLocation.s = obj.s;
        if (obj.tag2) {

          storedLocation.tag2 = obj.tag2;
          storedLocation.c2 = color2 = obj.c2;
          storedLocation.t2 = obj.t2;
          storedLocation.s2 = obj.s2;

          ctr.author = (obj.author && obj.author !=='') ? obj.author : __footerSlogan;
          ctr.bannedSections = obj.ban;
          ctr.versus.mainImage = obj.bg;
          ctr.versus.withoutTopImage = obj.withoutBg;

          ctr.sortingList = obj.sorting;

        } else {
          

          ctr.author = (obj.author && obj.author !=='') ? obj.author : __footerSlogan;
          ctr.bannedSections = obj.ban;
          ctr.solo.mainImage = obj.bg;
          ctr.solo.withoutTopImage = obj.withoutBg;

          ctr.solo.quote = obj.quote;
          ctr.solo.quoteAuthor = obj.quoteAuthor;
          ctr.sortingList = obj.sorting;
        }

        defer.resolve(storedLocation);
      });
    }
    promise.then(function(storedLocation) {
      if (storedLocation.tag2) {
        ctr.oneTag = false;

        $q.all({
          tag1: S_api.getTagStat(storedLocation.tag, storedLocation.t, storedLocation.s),
          tag2: S_api.getTagStat(storedLocation.tag2, storedLocation.t2, storedLocation.s2)
        }).then(function(resp) {
          ctr.preloadingInfo = false;
          var info = ctr.versus;

          info.tag1 = resp.tag1.data;
          info.tag2 = resp.tag2.data;

          info.mainImageIndex = 0;
          info.background_image = S_utils.getVersusBackgrounds();
          
          info.mainImage = info.mainImage || info.background_image[0].url;

          info.tag1.age = moment().diff(moment(info.tag1.birth_date, 'YYYY-MM-DD HH:mm:ss'), 'years');
          info.tag2.age = moment().diff(moment(info.tag2.birth_date, 'YYYY-MM-DD HH:mm:ss'), 'years');


          info.tag1.age += ' ' + S_utils.plural(info.tag1.age, 'год', 'года', 'лет');
          info.tag2.age += ' ' + S_utils.plural(info.tag2.age, 'год', 'года', 'лет');

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
          tag: S_api.getTagStat(storedLocation.tag, storedLocation.t, storedLocation.s)
        }).then(function(resp) {
          ctr.preloadingInfo = false;


          angular.extend(ctr.solo, resp.tag.data);

          ctr.solo.mainImageIndex = 0;

          ctr.solo.mainImage = ctr.solo.mainImage || ctr.solo.background_image[0].url;

          var date = moment(ctr.solo.birth_date, 'YYYY-MM-DD HH:mm:ss');
          ctr.solo.age = moment().diff(date, 'years');
          ctr.solo.age += ' ' + S_utils.plural(ctr.solo.age, 'год', 'года', 'лет');
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
    });

    ctr.getTagInfo = function(key) {
      return ((typeof key === 'number') ? ((!key) ? ctr.versus.tag1 : ctr.versus.tag2) : key);
    }

    ctr.getColor = function(key) {
      return ('#' + ((!key) ? color1 : color2));
    }

    ctr.getTextColor = function(key) {
      if (!key && !color1 || key && !color2) {
        return
      }
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
      info.withoutTopImage = !info.withoutTopImage;
    }

    ctr.withoutBackground = function(key) {
      return ctr.getTagInfo(key).withoutTopImage;
    }

    ctr.sortableOptions = {
      axis: 'y',
      handle: '.reorder',
      stop: function() {
        $scope.$apply(function() {
          ctr.currentUnix = new Date();
        });
      }
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

    ctr.toHumanMatchDate = function(date) {
      return moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY');
    }

    ctr.saveImage = function() {
      ctr.prepareSaveDoc = true;

      $timeout(function() {
        if (!ctr.author || ctr.author === '') {
          ctr.author = __footerSlogan;
        }
        ctr.saveDocMode = ctr.observerMode = true;
        ctr.savingInProgress = true;
      }, 300);

    }

    ctr.afterSaving = function() {
      ctr.saveDocMode = false;
      if (ctr.author === __footerSlogan) {
        ctr.author = '';
      }
      ctr.savingInProgress = false;
      $timeout(function() {
        ctr.prepareSaveDoc = false;
      }, 300);
    }

    ctr.thisIsEmptyTimeline = function(tl) {
      return _.max(tl, function(e) {
        return e.goals_count;
      }).goals_count === 0;
    }

    ctr.shareAction = function(type) {
      if ($state.params.info) {
        shareFunc($state.params.info, type);
        return
      }

      if (ctr.savedConfigId) {
        shareFunc(ctr.savedConfigId, type);
        return
      }

      if (ctr.sharingInProgress) {
        return;
      }
      ctr.observerMode = ctr.saveDocMode = true;
      ctr.sharingInProgress = true;

      var obj = {};
      if (ctr.oneTag) {
        obj.ban = ctr.bannedSections;
        obj.bg = ctr.solo.mainImage;
        obj.withoutBg = ctr.solo.withoutTopImage;
        obj.tag = storedLocation.tag;
        obj.s = storedLocation.s;
        obj.c = color1;
        obj.t = storedLocation.t;
        obj.quote = ctr.solo.quote;
        obj.quoteAuthor = ctr.solo.quoteAuthor;
        obj.sorting = ctr.sortingList;
        obj.author = ctr.author;


        obj.player1_name = ctr.solo.player_name;
        obj.player1_surname = ctr.solo.player_surname;

        S_api.saveLocationState(obj).then(function(resp) {
          ctr.savedConfigId = resp.data.id;
          ctr.sharingInProgress = false;
          shareFunc(resp.data.id, type);
        });
      } else {
        obj.ban = ctr.bannedSections;
        obj.bg = ctr.versus.mainImage;
        obj.withoutBg = ctr.versus.withoutTopImage;

        obj.tag = storedLocation.tag;
        obj.s = storedLocation.s;
        obj.c = color1;
        obj.t = storedLocation.t;
        obj.tag2 = storedLocation.tag2;
        obj.s2 = storedLocation.s2;
        obj.c2 = color2;
        obj.t2 = storedLocation.t2;

        obj.player1_name = ctr.getTagInfo(0).player_name;
        obj.player1_surname = ctr.getTagInfo(0).player_surname;
        obj.player2_name = ctr.getTagInfo(1).player_name;
        obj.player2_surname = ctr.getTagInfo(1).player_surname;

        obj.sorting = ctr.sortingList;
        obj.author = ctr.author;

        S_api.saveLocationState(obj).then(function(resp) {
          ctr.savedConfigId = resp.data.id;
          ctr.sharingInProgress = false;
          shareFunc(resp.data.id, type);
        });
      }
    }

    function shareFunc(id, type) {
      var shareUrl = __introDomain + '/infographic/stats/?info=' + id;
      switch (type) {
        case 'fb':
          {
            S_utils.openSharePopup('http://www.facebook.com/sharer.php?u=' + shareUrl, 'Поделиться инфографиков в Facebook');
            break;
          }
        case 'vk':
          {
            S_utils.openSharePopup('http://vk.com/share.php?url=' + shareUrl, 'Поделиться инфографиков в Facebook');
            break;
          }
        case 'tw':
          {
            S_utils.openSharePopup('https://twitter.com/share?url=' + shareUrl, 'Поделиться инфографиков в Facebook');
            break;
          }
        case 'url':
          {
            S_utils.openCopyPopup(shareUrl);
            break;
          }
      }
    }

    ctr.setNewSortingList = function(list) {
      ctr.sortingList = list;
    }

    return ctr;
  }
]);
