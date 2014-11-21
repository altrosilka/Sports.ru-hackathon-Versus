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
