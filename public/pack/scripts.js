var App = angular.module('App', [
  'ngSanitize',
  'ui.router',
  'ui.sortable',
  'ui.bootstrap',
  'templates'
]);

angular.module('App').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('index', {
        url: "/",
        controller: 'CV_index as ctr',
        templateUrl: "templates/views/index.html"
      })
      .state('stats', {
        url: "/stats/?tag&c&t&s&tag2&t2&c2&s2",
        controller: 'CV_stats as ctr',
        templateUrl: "templates/views/stats.html",
        reloadOnSearch: false
      })
  }
]);

angular.module('App')
  .constant('__api',{
    base: 'http://www.sports.ru',
    paths: {
      search: '/search/search.json',
    }
  })
angular.module('App').run([
  function() {

  }
]);

angular.module('App').controller('C_background', ['$state', '$scope', 'PS_lastfm', function($state, $scope, PS_lastfm) {
  var ctr = this;

  var defaultImage = '/images/background/intro.jpg'; 

  ctr.image = defaultImage;

  $scope.$on('artistInfoRecievedFromLF', function(event, info) {
    ctr.image = info.image;
  });

  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
    if ((fromState.name === 'artistpage' || fromState.name === 'artistpage.section') && (toState.name !== 'artistpage' && toState.name !== 'artistpage.section')) {
      ctr.image = defaultImage;
    }
  });


  return ctr;
}]);

angular.module('App').directive('autocompleteArea', [function() {
  return {
    scope: {
      info: '=',
      withButton: '=',
      info: '=',
    },
    templateUrl: 'templates/directives/autocompleteArea.html',
    controller: 'CD_autocompleteArea as ctr',
    link: function($scope, $element, $attrs, CD_autocompleteArea) {
      if ($scope.withButton) {
        var className = 'notShowing';
        var input = $element.find('input');
        var mover = $(document.createElement('div')).html('Сравнить с другим игроком').addClass('onfocusbutton btn btn-primary').on('click', function() {
          input.trigger('focus');
          $(this).addClass(className);
        }).appendTo($element.find('[data-role="area"]'));

        input.on('blur', function() {
          if ($(this).val() === '') {
            mover.removeClass(className);
          }
        });
      }
    }
  }
}])

angular.module('App').directive('colorPicker', [function() {
  return {
    scope: {
      color: '=colorPicker',
      colorChange: '&',
      tagNum: '='
    },
    link: function($scope, $element, $attrs) {

      if (typeof $scope.color === 'undefined'){
        $element.addClass('pickerIsInited').ColorPickerSliders({
          placement: $attrs.placement || 'right',
          hsvpanel: true,
          sliders: false,
          swatches: false,
          previewformat: 'hex'
        });
        return;
      }

      $scope.$watch(function() {
        return $scope.color;
      }, function(color) {
        if (!color || $element.hasClass('pickerIsInited')) return;

        $element.addClass('pickerIsInited').val(color).ColorPickerSliders({
          placement: $attrs.placement || 'right',
          hsvpanel: true,
          sliders: false,
          swatches: false,
          previewformat: 'hex',
          onchange: function(container, color){
            if (typeof $scope.colorChange === 'function'){
              var colorStr = $element.val().replace('#','');
              $scope.colorChange({
                color: colorStr,
                key: $scope.tagNum
              });
            }
          } 
        });
      });

    }
  }
}])

angular.module('App').directive('customSelect', function() {
  return {
    transclude: true,
    scope: {
      selectId: '=customSelect',
      closeOnSelect: '=',
      options: '=',
      sectionFormat: '=',
      sectionDefault: '=',
      optionFormat: '=',
      optionDisabled: '&',
      optionActive: '&',
      onSelect: '&',
      options: '=',
      customContent: '='
    },
    controller: 'CD_customSelect as cSCtr',
    templateUrl: 'templates/directives/customSelect.html',
    link: function(scope, element, attrs, ctrl, transclude) {
      var parent = scope.$parent.$new();
      var current = scope;

      transclude(parent, function(clone, scope) {
        scope.$close = current.cSCtr.close;
        element.find('[data-role="custom-content"]').append(clone);
      });

      element.find('menu').on('click', function(event) {
        event.stopPropagation();
      });
    }
  }
})

angular.module('App').directive('flagIcon', [function() {
  return {
    scope: {
      flag: '=flagIcon'
    },
    link: function($scope, $element, $attrs) {
      $scope.$watch('flag',function(val){
        if(!val) return;
        
        $element.addClass('flag-icon-'+val);
      });
      
    }
  }
}])

angular.module('App').directive('goalsTimeline', [function() {
  return {
    scope: {
      data: '=goalsTimeline',
      color: '='
    },
    link: function($scope, $element, $attrs) {
      var chart;
      $scope.$watch('color', function(color) {
        if (!color) return;

        if ($scope.data) {
          _.forEach(chart.highcharts().series, function(el) {

            el.options.color = color;
            el.update(el.options);
          })
        }
      });

      $scope.$watch('data', function(data) {
        if (!data) return;

        var categories = [];
        var max = _.max(data, function(e) {
          categories.push(e.period);
          return e.goals_count;
        }).goals_count;

        var boys = [];
        var series


        var series = [];

        for (var i = 0; i < max; i++) {
          var arr = [];
          _.forEach(data, function(e) {
            arr.push((e.goals_count >= i) ? 1 : 0);
          });
          series.push({
            data: arr,
            color: $scope.color
          });
        }

        chart = $element.highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: null
          },
          xAxis: {
            categories: categories
          },
          yAxis: {
            min: 0,
            lineWidth: 0,
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            lineColor: 'transparent',
            title: {
              text: null
            },
            labels: {
              enabled: false
            },
            minorTickLength: 0,
            tickLength: 0,
            stackLabels: {
              enabled: true,
              style: {
                fontSize: '22px',
                bottom: '10px',
                color: (Highcharts.theme && Highcharts.theme.textColor) || '#000'
              }
            }
          },
          legend: {
            enabled: false
          },
          tooltip: {
            enabled: false,
            formatter: function() {
              return '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y + '<br/>' +
                'Total: ' + this.point.stackTotal;
            }
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              animation: false,
              dataLabels: {
                enabled: false
              }
            },
            series: {
              states: {
                hover: {
                  enabled: false
                }
              }
            }
          },
          series: series
        });
        chart.find('text:contains("Highcharts.com")').remove();
      });
    }
  }
}])

angular.module('App').directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});

angular.module('App')
  .directive('setBgOnLoad', ['$timeout', 'S_utils', function($timeout, S_utils) {
    return {
      scope: {
        src: '=setBgOnLoad',
        newLayer: '='
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
            promise.then(function() {
              var oldLayers = $element.find('.layer');
              var layer = $(document.createElement('div')).addClass('layer').css({
                "background-image": "url(" + $scope.src + ")"
              }).appendTo($element);
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

angular.module('App')
  .service('S_api', ['$http', '$timeout', '$q', '__api', function($http, $timeout, $q, __api) {
    var service = {};

    var base = __api.base;

    service.searchByQuery = function(query) {
      return $http({
        url: base + __api.paths.search,
        method: 'GET',
        params: {
          query: query,
          only: 'tags'
        }
      });
    }

    service.getTournamentsList = function(tag) {
      var defer = $q.defer();
      $timeout(function() {
        defer.resolve({
          "tournamet_list": [{
            "name": 'Российская премьер-лига',
            "seasons": [{
              id: 354,
              name: 'Сезон 2014/15'
            }, {
              id: 355,
              name: 'Сезон 2013/14'
            }, {
              id: 356,
              name: 'Сезон 2012/13'
            }, ],
            "id": 12423533
          }, {
            "name": 'Какая-то еще лига',
            "seasons": [{
              id: 1355,
              name: 'Сезон 2013/14'
            }, {
              id: 1356,
              name: 'Сезон 2012/13'
            }, ],
            "id": 12423533
          }]
        });
      }, 1000);

      return defer.promise;
    }

    service.getTagStat = function(tag) {
      var defer = $q.defer();

      $timeout(function() {


        defer.resolve({
          "player_name": "Александр",
          "player_surname": "Кокорин",
          "avatar": "http://s5o.ru/storage/simple/ru/edt/44/18/55/31/rue9281df824f.png",
          "birth_date": "1982-11-03 00:00:00",
          "height": 182,
          "weight": 72,
          "flag": {
            "flag_url": "http://s5o.ru/common/css/i/flags-sprite.png",
            "flag_country": "Россия",
            "flag_code": "ru"
          },
          "team": {
            name: "Динамо",
            logo: "http://s5o.ru/storage/simple/ru/edt/89/83/60/09/ruea2f670fde9.jpg",
            tag_url: "http://www.sports.ru/dynamo/",
          },
          "amplua": "Нападающий",
          "tag_url": "http://www.sports.ru/kokorin/",
          "background_images": [
            'http://s5o.ru/storage/simple/ru/edt/89/14/51/73/rue514b41dfa7.jpg',
            'http://s5o.ru/storage/simple/ru/edt/85/79/56/26/rue8607905bce.jpg',
            'http://s5o.ru/storage/simple/ru/edt/41/64/64/95/rued3d92c842a.jpg',
            'http://s5o.ru/storage/simple/ru/edt/84/42/72/05/rue31356179ee.jpg',
            'http://s5o.ru/storage/simple/ru/edt/86/02/54/20/ruef856755f40.jpg',
            'http://s5o.ru/storage/simple/ru/edt/86/08/53/34/rue2d9fc0aace.jpg',
            'http://s5o.ru/storage/simple/ru/edt/84/54/29/08/rue09a8cca094.jpg',
            'http://s5o.ru/storage/simple/ru/edt/20/22/21/27/rue05cdcac0cf.jpg',
            'http://s5o.ru/storage/simple/ru/edt/20/17/10/99/rue104243346a.jpg',
            'http://s5o.ru/storage/simple/ru/edt/52/82/45/89/ruefce727ee00.jpg',
            'http://s5o.ru/storage/simple/ru/edt/04/84/56/56/rue8839ad570a.49.670x1340.jpeg',
            'http://s5o.ru/storage/simple/ru/edt/03/57/60/36/ruef4b81e0a03.49.670x1340.jpeg',
            'http://s5o.ru/storage/simple/ru/edt/58/03/47/29/rue809df0a512.jpeg',
            'http://s5o.ru/storage/simple/ru/edt/34/75/58/95/rue9dadbe4331.49.670x1340.jpeg'
          ],
          "stat": {
            "season": "Сезон 2014/2015 ",
            "tournament": "премьер-лига Россия",
            "goals": 6,
            "goal_passes": 5,
            "minutes": 984,
            "efficient_minutes": 90,
            "goals_timeline": [{
              "period": "0-15",
              "goals_count": 2
            }, {
              "period": "15-30",
              "goals_count": 1
            }, {
              "period": "30-45",
              "goals_count": 0
            }, {
              "period": "45-60",
              "goals_count": 0
            }, {
              "period": "60-75",
              "goals_count": 3
            }, {
              "period": "75-90",
              "goals_count": 2
            }],
            "yellow_red_cards": 1,
            "most_efficient_match": {},
            "matches_count": 12
          }
        });

      }, 1000);

      return defer.promise;
    }

    return service;
  }]);

angular.module('App')
  .service('S_location', [
    '$location',
    function($location) {
      var service;

      service = {
        setAttr: function(attr, value) {
          var obj = {};
          obj[attr] = value;
          //TODO: dont'use &&search stupid boy 
          $location.search(angular.extend($location.$$search, obj));
        },
      }

      return service;
    }
  ])

angular.module('App')
  .service('S_utils', ['$q', function($q) {
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

    service.getVersusBackgrounds = function(){
      return ['/images/versus-bg/fvs01.png','/images/versus-bg/fvs02.png','/images/versus-bg/fvs03.png','/images/versus-bg/fvs04.png','/images/versus-bg/fvs05.png','/images/versus-bg/fvs06.png','/images/versus-bg/fvs07.png'];
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

angular.module('App').controller('CD_autocompleteArea', ['$scope', 'S_api', function($scope, S_api) {
  var ctr = this;

  ctr.searchByQuery = function(val) {
    return S_api.searchByQuery(val).then(function(response) {
      return response.data.suggestions; 
    });
  }

  ctr.onTagSelect = function(item, model, label){
    $scope.info = item;
  }

  return ctr;
}]);
 
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

angular.module('App').controller('CV_index', ['$state', '$q', '$scope', 'S_api', 'S_utils', function($state, $q, $scope, S_api, S_utils) {
  var ctr = this;

  ctr.leftSideInfo = {
    selectedTournament: {},
    selectedSeason: {},
    info: {},
    color: '#A6FF00'
  };
  ctr.rightSideInfo = {
    selectedTournament: {},
    selectedSeason: {},
    info: {},
    color: '#FFA600'
  };

  $scope.$watch(function() {
    return ctr.leftSideInfo.info;
  }, function(tag) {
    if (!tag || !tag.name) return;

    ctr.leftSideInfo.info = tag;
    ctr.leftSideInfo.preloadingTagInfo = true;

    $q.all({
      image: S_utils.loadImage(tag.img),
      tournaments: S_api.getTournamentsList(tag),
    }).then(function(resp) {
      ctr.leftSideInfo.preloadingTagInfo = false;
      ctr.leftSideInfo.tournaments = resp.tournaments.tournamet_list;
    });
  });

  $scope.$watch(function() {
    return ctr.rightSideInfo.info;
  }, function(tag) {
    if (!tag || !tag.name) return;

    ctr.rightSideInfo.info = tag;
    ctr.rightSideInfo.preloadingTagInfo = true;

    $q.all({
      image: S_utils.loadImage(tag.img),
      tournaments: S_api.getTournamentsList(tag),
    }).then(function(resp) {
      ctr.rightSideInfo.preloadingTagInfo = false;
      ctr.rightSideInfo.tournaments = resp.tournaments.tournamet_list;
    });
  });

  ctr.getCollectorByKey = function(key) {
    return ((!key) ? ctr.leftSideInfo : ctr.rightSideInfo);
  };

  ctr.secondTagIsReady = function() {
    return ctr.showTagInfo[1];
  }

  ctr.selectParam = function(key, param, type) {
    switch (type) {
      case 'tour':
        {
          if (ctr.getCollectorByKey(key).selectedTournament.name !== param.name) {
            ctr.getCollectorByKey(key).selectedSeason = {};
          }
          ctr.getCollectorByKey(key).selectedTournament = param;
          ctr.getCollectorByKey(key).seasons = param.seasons;

          break;
        }
      case 'season':
        {
          ctr.getCollectorByKey(key).selectedSeason = param;
          break;
        }
    }
  }

  ctr.setColor = function(event, key) {
    ctr.getCollectorByKey(key).color = event.currentTarget.value;
  }

  ctr.paramIsActive = function(key, param, type) {
    switch (type) {
      case 'tour':
        {
          return ctr.getCollectorByKey(key).selectedTournament.name === param.name;
          break;
        }
      case 'season':
        {
          return ctr.getCollectorByKey(key).selectedSeason.name === param.name;
          break;
        }
    }
  }

  ctr.tournamentsIsLoaded = function(key) {
    return ctr.getCollectorByKey(key).tournaments;
  }

  ctr.tournamentIsSelected = function(key) {
    return ctr.getCollectorByKey(key).selectedTournament.name;
  }

  ctr.seasonIsSelected = function(key) {
    return ctr.getCollectorByKey(key).selectedSeason.name;
  }

  ctr.showTagPreloader = function(key) {
    return ctr.getCollectorByKey(key).preloadingTagInfo === true;
  }

  ctr.statsButtonIsActive = function() {
    return (ctr.rightSideInfo.info.name) ? ctr.seasonIsSelected(0) && ctr.seasonIsSelected(1) : ctr.seasonIsSelected(0);
  }

  ctr.getSelectPlaceholder = function(key, type) {
    switch (type) {
      case 'tour':
        {
          return (!ctr.getCollectorByKey(key).selectedTournament.name) ? 'Выберите турнир' : ctr.getCollectorByKey(key).selectedTournament.name;
          break;
        }
      case 'season':
        {
          return (!ctr.getCollectorByKey(key).selectedSeason.name) ? 'Выберите сезон' : ctr.getCollectorByKey(key).selectedSeason.name;
          break;
        }
    }
    return (!ctr.selectedParams[key].description) ? 'Выберите параметр' : ctr.selectedParams[key].description;
  }

  ctr.loadStats = function() {
    if (ctr.statsButtonIsActive()) {
      if (ctr.seasonIsSelected(1)) {
        $state.go('^.stats', {
          tag: ctr.leftSideInfo.info.id,
          c: ctr.leftSideInfo.color.replace('#', ''),
          t: ctr.leftSideInfo.selectedTournament.id,
          s: ctr.leftSideInfo.selectedSeason.id,
          tag2: ctr.rightSideInfo.info.id,
          c2: ctr.rightSideInfo.color.replace('#', ''),
          t2: ctr.rightSideInfo.selectedTournament.id,
          s2: ctr.rightSideInfo.selectedSeason.id
        });
      } else {
        $state.go('^.stats', {
          tag: ctr.leftSideInfo.info.id,
          c: ctr.leftSideInfo.color.replace('#', ''),
          t: ctr.leftSideInfo.selectedTournament.id,
          s: ctr.leftSideInfo.selectedSeason.id
        });
      }
    }
  }

  return ctr;
}]);

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
