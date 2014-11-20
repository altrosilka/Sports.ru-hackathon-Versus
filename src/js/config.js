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
        url: "/stats/",
        controller: 'CV_stats as ctr',
        templateUrl: "templates/views/stats.html"
      })
  }
]);
