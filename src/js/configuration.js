angular.module('App')
  .constant('__api',{
    base: 'http://www.sports.ru',
    baseHack: 'http://hack03.sports.ru',
    paths: {
      getTournamentsList: '/stat/player/get_seasons/', 
      getTagStat: '/stat/player/get_info/', 
      search: '/search/search.json'
    }
  })