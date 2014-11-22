angular.module('App').controller('CV_index', [
  '$state',
  '$q',
  '$scope',
  'S_api',
  'S_utils',
  'S_eventer',
  function($state, $q, $scope, S_api, S_utils, S_eventer) {
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
      if (!tag || !tag.name) return;

      ctr.leftSideInfo.info = tag;
      ctr.leftSideInfo.preloadingTagInfo = true;

      S_eventer.sendEvent('goSearch');

      $q.all({
        image: S_utils.loadImage(tag.img),
        tournaments: S_api.getTournamentsList(tag.id),
      }).then(function(resp) {
        ctr.leftSideInfo.preloadingTagInfo = false;
        ctr.leftSideInfo.tournaments = resp.tournaments.data.tournament_list;
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
        tournaments: S_api.getTournamentsList(tag.id),
      }).then(function(resp) {
        ctr.rightSideInfo.preloadingTagInfo = false;
        ctr.rightSideInfo.tournaments = resp.tournaments.data.tournament_list;
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
      debugger
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
      debugger
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

    ctr.secondIsActive = function(){
      
      return (ctr.seasonIsSelected(0) || ctr.rightSideInfo.info.name);
    }

    return ctr;
  }
]);
