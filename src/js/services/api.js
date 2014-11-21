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
            {url:'http://s5o.ru/storage/simple/ru/edt/89/14/51/73/rue514b41dfa7.jpg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/85/79/56/26/rue8607905bce.jpg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/41/64/64/95/rued3d92c842a.jpg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/84/42/72/05/rue31356179ee.jpg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/86/02/54/20/ruef856755f40.jpg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/86/08/53/34/rue2d9fc0aace.jpg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/84/54/29/08/rue09a8cca094.jpg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/20/22/21/27/rue05cdcac0cf.jpg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/20/17/10/99/rue104243346a.jpg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/52/82/45/89/ruefce727ee00.jpg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/04/84/56/56/rue8839ad570a.49.670x1340.jpeg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/03/57/60/36/ruef4b81e0a03.49.670x1340.jpeg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/58/03/47/29/rue809df0a512.jpeg'},
            {url:'http://s5o.ru/storage/simple/ru/edt/34/75/58/95/rue9dadbe4331.49.670x1340.jpeg'}
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
            "yellow_cards": 1,
            "red_cards": 4,
            "most_efficient_match": {},
            "matches_count": 12
          }
        });

      }, 1000);

      return defer.promise;
    }

    return service;
  }]);
