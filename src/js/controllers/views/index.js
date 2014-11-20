angular.module('App').controller('CV_index', ['$state', '$q', '$scope', 'S_api', 'S_utils', function($state, $q, $scope, S_api, S_utils) {
  var ctr = this;

  ctr.leftSideInfo = {
    selectedTournament: {},
    selectedSeason: {},
    info: {}
  };
  ctr.rightSideInfo = {
    selectedTournament: {},
    selectedSeason: {},
    info: {}
  };

  $scope.$watch(function() {
    return ctr.leftSideInfo.info;
  }, function(tag) {
    if (!tag) return;

    ctr.leftSideInfo.info = tag;

    $q.all({
      image: S_utils.loadImage(tag.img),
      tournaments: S_api.getTournamentsList(tag),
    }).then(function(resp) {
      ctr.leftSideInfo.preloadingTagInfo = false;
      ctr.leftSideInfo.tournaments = resp.tournaments.tournamet_list;
    });

    ctr.leftSideInfo.preloadingTagInfo = true;

  });

  $scope.$watch(function() {
    return ctr.rightSideInfo.info;
  }, function(tag) {
    if (!tag) return;

    ctr.rightSideInfo.info = tag;

    $q.all({
      image: S_utils.loadImage(tag.img),
      tournaments: S_api.getTournamentsList(tag),
    }).then(function(resp) {
      ctr.rightSideInfo.preloadingTagInfo = false;
      ctr.rightSideInfo.tournaments = resp.tournaments.tournamet_list;
    });

    ctr.rightSideInfo.preloadingTagInfo = true;

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


  return ctr;
}]);
