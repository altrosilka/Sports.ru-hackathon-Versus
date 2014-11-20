angular.module('App')
  .constant('__api',{
    base: 'http://www.sports.ru',
    paths: {
      search: '/search/search.json',
    }
  })