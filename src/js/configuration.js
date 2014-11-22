angular.module('App')
  //.constant('__storagePath', 'http://hack03.sports.ru/s5o/source/infographic/')
  .constant('__storagePath', '')
  .constant('__introDomain', location.protocol + '//' + location.host)
  .constant('__api', {
    base: 'http://www.sports.ru',
    baseHack: 'http://hack03.sports.ru',
    paths: {
      getTournamentsList: '/stat/player/get_seasons/',
      getTagStat: '/stat/player/get_info/',
      search: '/search/search.json',
      saveLocationState: '/stat/player/save_infographic/',
      getLocationStateById: '/stat/player/get_infographic/'
    }
  })
  .constant('__footerSlogan', 'Создайте свою инфографику на www.sports.ru/infographics')
