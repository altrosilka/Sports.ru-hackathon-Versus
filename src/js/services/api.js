angular.module('App')
  .service('S_api', ['$http', '$q', '__api', function($http, $q, __api) {
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
        },{
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

      return defer.promise;
    }

    return service;
  }]);
