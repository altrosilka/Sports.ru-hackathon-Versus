angular.module('App')
  .service('S_utils', ['$q',function($q) {
    var service = {};

    service.loadImage = function(src){
      var defer = $q.defer();

      var image = new Image();
      image.src = src;
      image.onload = function(){ 
        defer.resolve(this);
      }
      image.onerror = function(){
        defer.reject(this);
      }

      return defer.promise;
    }

    return service;
  }]);
