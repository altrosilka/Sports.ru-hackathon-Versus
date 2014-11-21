angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/directives/autocompleteArea.html","<div class=\"autocompleteArea\" data-role=\"area\">\n  <i class=\"fa fa-spinner fa-spin loading\" ng-show=\"ctr.loadingInProgress\"></i>\n  <input type=\"text\" ng-model=\"ctr.model\" placeholder=\"Начните вводить имя игрока\" typeahead=\"tag as tag.name for tag in ctr.searchByQuery($viewValue)\" typeahead-loading=\"ctr.loadingInProgress\" typeahead-template-url=\"templates/other/autocompleteAreaTypeahead.html\" typeahead-min-length=\"2\" typeahead-on-select=\"ctr.onTagSelect($item, $model, $label)\" class=\"form-control\">\n</div>\n");
$templateCache.put("templates/directives/customSelect.html","<div class=\"custom_select\" ng-class=\"{\'opened\':cSCtr.opened}\">\n  <section ng-click=\"cSCtr.open()\" ng-bind-html=\"section\"></section>\n  <menu ng-show=\"customContent\" data-role=\"custom-content\"></menu>\n  <menu ng-show=\"!customContent\">\n    <button class=\"option\" ng-repeat=\"option in options\" ng-click=\"cSCtr.selectOption($event, option)\" ng-disabled=\"cSCtr.isDisabled(option)\" ng-class=\"{\'active\':cSCtr.isActive(option)}\">\n      <span compile=\"optionFormat\"></span>\n    </button>\n  </menu>\n</div>\n");
$templateCache.put("templates/other/autocompleteAreaTypeahead.html","<a>\n  <img ng-src=\"{{match.model.img}}\"><span ng-bind=\"match.model.name\"></span>\n</a>\n");
$templateCache.put("templates/views/index.html","<section class=\"v_index\">\n  <div class=\"container\">\n    <div class=\"tagsArea clearfix\">\n      <div class=\"tagArea\">\n        <div class=\"complete\">\n          <div data-autocomplete-area data-with-button=\"false\" data-info=\"ctr.leftSideInfo.info\"></div>\n        </div>\n        <div class=\"loader\" ng-class=\"{\'active\':ctr.showTagPreloader(0)}\">\n          <i class=\"fa  fa-circle-o-notch fa-spin loading\"></i>\n        </div>\n        <div class=\"info\" ng-class=\"{\'active\':ctr.tournamentsIsLoaded(0)}\">\n\n          <div class=\"image\" ng-style=\"{\'background-image\':\'url(\'+ctr.leftSideInfo.info.img+\')\'}\"></div>\n          <h2 ng-bind=\"ctr.leftSideInfo.info.name\"></h2>\n          <div class=\"colors\">Задайте цвет данных\n            <input type=\"text\" class=\"colorPicker\" ng-blur=\"ctr.setColor($event,0)\" data-color-format=\"hex\" color-picker>\n          </div>\n\n          <span class=\"plash\" custom-select section-format=\"ctr.getSelectPlaceholder(0,\'tour\')\" custom-content=\"true\">\n            <button class=\"option\" ng-repeat=\"tournament in ctr.leftSideInfo.tournaments\" ng-click=\"ctr.selectParam(0,tournament, \'tour\');$close();\" ng-class=\"{\'active\':ctr.paramIsActive(0, tournament, \'tour\')}\">\n              {{tournament.name}}\n            </button>\n          </span>\n\n\n          <span class=\"plash\" ng-class=\"{\'inHide\':!ctr.tournamentIsSelected(0)}\" custom-select section-format=\"ctr.getSelectPlaceholder(0,\'season\')\" custom-content=\"true\">\n            <button class=\"option\" ng-repeat=\"season in ctr.leftSideInfo.seasons\" ng-click=\"ctr.selectParam(0,season, \'season\');$close();\" ng-class=\"{\'active\':ctr.paramIsActive(0, season, \'season\')}\">\n              {{season.name}}\n            </button>\n          </span>\n\n        </div>\n      </div>\n\n      <div class=\"tagArea second\" ng-class=\"{\'active\':ctr.seasonIsSelected(0)}\">\n        <div class=\"complete\">\n          <div data-autocomplete-area data-with-button=\"true\" data-info=\"ctr.rightSideInfo.info\"></div>\n        </div>\n        <div class=\"loader\" ng-class=\"{\'active\':ctr.showTagPreloader(1)}\">\n          <i class=\"fa  fa-circle-o-notch fa-spin loading\"></i>\n        </div>\n        <div class=\"info\" ng-class=\"{\'active\':ctr.tournamentsIsLoaded(1)}\">\n\n          <div class=\"image\" ng-style=\"{\'background-image\':\'url(\'+ctr.rightSideInfo.info.img+\')\'}\"></div>\n          <h2 ng-bind=\"ctr.rightSideInfo.info.name\"></h2>\n          <div class=\"colors\">Задайте цвет данных\n            <input type=\"text\" class=\"colorPicker\" value=\"#FFA600\" data-color-format=\"hex\" ng-model=\"ctr.rightSideInfo.color\" color-picker>\n          </div>\n\n          <span class=\"plash\" custom-select section-format=\"ctr.getSelectPlaceholder(1,\'tour\')\" custom-content=\"true\">\n            <button class=\"option\" ng-repeat=\"tournament in ctr.rightSideInfo.tournaments\" ng-click=\"ctr.selectParam(1,tournament, \'tour\');$close();\" ng-class=\"{\'active\':ctr.paramIsActive(1, tournament, \'tour\')}\">\n              {{tournament.name}}\n            </button>\n          </span>\n\n\n          <span class=\"plash\" ng-class=\"{\'inHide\':!ctr.tournamentIsSelected(1)}\" custom-select section-format=\"ctr.getSelectPlaceholder(1,\'season\')\" custom-content=\"true\">\n            <button class=\"option\" ng-repeat=\"season in ctr.rightSideInfo.seasons\" ng-click=\"ctr.selectParam(1,season, \'season\');$close();\" ng-class=\"{\'active\':ctr.paramIsActive(1, season, \'season\')}\">\n              {{season.name}}\n            </button>\n          </span>\n\n        </div>\n      </div>\n\n    </div>\n    <div class=\"showResultsWrapper\" ng-class=\"{\'center\':ctr.seasonIsSelected(1)}\">\n      <div class=\"showResults\" ng-class=\"{\'active\':ctr.statsButtonIsActive()}\">\n        <button class=\"btn btn-primary block\" ng-click=\"ctr.loadStats()\">создать</button>\n      </div>\n    </div>\n  </div>\n</section>\n");
$templateCache.put("templates/views/stats.html","<section class=\"v_stats\">\n  <div class=\"container\">\n    <div class=\"loader\" ng-class=\"{\'active\':ctr.preloadingInfo}\">\n      <i class=\"fa fa-futbol-o fa-spin loading\"></i>\n    </div>\n    <div class=\"statsArea\" ng-class=\"{\'active\':ctr.readyToShow}\">\n      <section ng-if=\"ctr.oneTag\">\n        <div class=\"background\" ng-class=\"{\'exec\':ctr.witoutBackground(ctr.solo)}\">\n          <div class=\"rightComment\" ng-click=\"ctr.toggleImage(ctr.solo);\">\n            <span class=\"remove\">\n              <i class=\"fa fa-times\"></i>\n              <div class=\"text\">Удалить фоновую\n                <br>фотографию</div>\n            </span>\n            <span class=\"add\">\n              <i class=\"fa fa-check\"></i>\n              <div class=\"text\">Показать фоновую\n                <br>фотографию</div>\n            </span>\n          </div>\n\n          <div class=\"rightComment other\" ng-click=\"ctr.nextTagImage(ctr.solo)\">\n            <i class=\"fa fa-angle-right\"></i>\n            <div class=\"text\">Другая\n              <br>фотография</div>\n          </div>\n\n          <div class=\"backimage\" set-bg-on-load=\"ctr.solo.mainImage\" new-layer=\"true\"></div>\n\n          <div class=\"info\">\n            <div class=\"overview left\">\n              <div class=\"point\">Родился\n                <strong ng-bind=\"ctr.solo.birthdayHuman\"></strong>\n              </div>\n              <div class=\"point\">Возраст\n                <strong ng-bind=\"ctr.solo.age\"></strong>\n              </div>\n            </div>\n            <div class=\"overview right\">\n              <div class=\"point\">Рост\n                <strong>\n                  <span ng-bind=\"ctr.getTagInfo(0).height\"></span>&nbsp;см</strong>\n              </div>\n              <div class=\"point\">Вес\n                <strong>\n                  <span ng-bind=\"ctr.getTagInfo(0).weight\"></span>&nbsp;кг</strong>\n              </div>\n            </div>\n            <div class=\"image\" ng-style=\"{\'background-image\':\'url(\'+ctr.solo.avatar+\')\',\'border-color\':ctr.getColor(0)}\"></div>\n            <div class=\"country\">\n              <span class=\"flag\" class=\"flag-icon\" flag-icon=\"ctr.solo.flag.flag_code\"></span>\n              <span class=\"title\" ng-bind=\"ctr.solo.flag.flag_country\"></span>\n            </div>\n            <h1>\n              <div ng-bind=\"ctr.solo.player_name\"></div>\n              <div ng-bind=\"ctr.solo.player_surname\"></div>\n            </h1>\n            <div class=\"tour\">\n              <span ng-bind=\"ctr.solo.stat.tournament\"></span>.&nbsp;\n              <span ng-bind=\"ctr.solo.stat.season\"></span>\n            </div>\n          </div>\n        </div>\n        <div class=\"teamReview\" ng-style=\"{\'background-color\':ctr.getColor(0), \'color\':ctr.getTextColor(0)}\">\n          <div class=\"rightComment color\">\n            <label>\n              <i class=\"fa fa-eyedropper\"></i>\n              <div class=\"text\">Изменить цвет</div>\n              <input type=\"text\" class=\"colorPicker\" placement=\"top\" data-color-format=\"hex\" tag-num=\"0\" color-change=\"ctr.setColor(color, key)\" color-picker=\"ctr.getColor(0)\">\n            </label>\n          </div>\n          <a class=\"name pull-left link no-border\" ng-href=\"{{ctr.solo.team.tag_url}}\" ng-bind=\"ctr.solo.team.name\" ng-style=\"{\'color\':ctr.getTextColor(0)}\"></a>\n          <a class=\"logo\" target=\"_blank\" ng-href=\"{{ctr.solo.team.tag_url}}\" ng-style=\"{\'background-image\':\'url(\'+ctr.solo.team.logo+\')\'}\">\n          </a>\n          <span class=\"amplua pull-right\" ng-bind=\"ctr.solo.amplua\"></span>\n        </div>\n\n      </section>\n\n\n\n\n\n\n\n      <section ng-if=\"!ctr.oneTag\" class=\"versus\">\n        <div class=\"background\" ng-class=\"{\'exec\':ctr.witoutBackground(ctr.versus)}\">\n          <div class=\"rightComment\" ng-click=\"ctr.toggleImage(ctr.versus);\">\n            <span class=\"remove\">\n              <i class=\"fa fa-times\"></i>\n              <div class=\"text\">Удалить фоновую\n                <br>фотографию</div>\n            </span>\n            <span class=\"add\">\n              <i class=\"fa fa-check\"></i>\n              <div class=\"text\">Показать фоновую\n                <br>фотографию</div>\n            </span>\n          </div>\n\n          <div class=\"rightComment other\" ng-click=\"ctr.nextTagImage(ctr.versus)\">\n            <i class=\"fa fa-angle-right\"></i>\n            <div class=\"text\">Другая\n              <br>фотография</div>\n          </div>\n\n          <div class=\"backimage\" set-bg-on-load=\"ctr.versus.mainImage\" new-layer=\"true\"></div>\n\n          <div class=\"colorImage left\" ng-style=\"{\'background-color\':ctr.getColor(0)}\"></div>\n          <div class=\"colorImage right\" ng-style=\"{\'background-color\':ctr.getColor(1)}\"></div>\n\n          <div class=\"info\">\n\n            <div class=\"player left\">\n              <div class=\"overview left\">\n                <div class=\"point age\">\n                  <strong ng-pluralize count=\"ctr.getTagInfo(0).age\" when=\"ctr.yearsPlural\"></strong>\n                </div>\n                <div class=\"point\">Рост\n                  <strong>\n                    <span ng-bind=\"ctr.getTagInfo(0).height\"></span>&nbsp;см</strong>\n                </div>\n                <div class=\"point\">Вес\n                  <strong>\n                    <span ng-bind=\"ctr.getTagInfo(0).weight\"></span>&nbsp;кг</strong>\n                </div>\n              </div>\n\n              <div class=\"image\" ng-style=\"{\'background-image\':\'url(\'+ctr.getTagInfo(0).avatar+\')\'}\"></div>\n              <div class=\"country\">\n                <span class=\"flag\" class=\"flag-icon\" flag-icon=\"ctr.getTagInfo(0).flag.flag_code\"></span>\n                <span class=\"title\" ng-bind=\"ctr.getTagInfo(0).flag.flag_country\"></span>\n              </div>\n              <h1>\n                <div ng-bind=\"ctr.getTagInfo(0).player_name\"></div>\n                <div ng-bind=\"ctr.getTagInfo(0).player_surname\"></div>\n              </h1>\n              <div class=\"tour\">\n                <span ng-bind=\"ctr.getTagInfo(0).stat.tournament\"></span>\n                <span ng-bind=\"ctr.getTagInfo(0).stat.season\"></span>\n              </div>\n            </div>\n\n            <div class=\"player right\">\n              <div class=\"overview right\">\n                <div class=\"point age\">\n                  <strong ng-pluralize count=\"ctr.getTagInfo(1).age\" when=\"ctr.yearsPlural\"></strong>\n                </div>\n                <div class=\"point\">Рост\n                  <strong>\n                    <span ng-bind=\"ctr.getTagInfo(1).height\"></span>&nbsp;см</strong>\n                </div>\n                <div class=\"point\">Вес\n                  <strong>\n                    <span ng-bind=\"ctr.getTagInfo(1).weight\"></span>&nbsp;кг</strong>\n                </div>\n              </div>\n\n              <div class=\"image\" ng-style=\"{\'background-image\':\'url(\'+ctr.getTagInfo(1).avatar+\')\'}\"></div>\n              <div class=\"country\">\n                <span class=\"flag\" class=\"flag-icon\" flag-icon=\"ctr.getTagInfo(1).flag.flag_code\"></span>\n                <span class=\"title\" ng-bind=\"ctr.getTagInfo(1).flag.flag_country\"></span>\n              </div>\n              <h1>\n                <div ng-bind=\"ctr.getTagInfo(1).player_name\"></div>\n                <div ng-bind=\"ctr.getTagInfo(1).player_surname\"></div>\n              </h1>\n              <div class=\"tour\">\n                <span ng-bind=\"ctr.getTagInfo(1).stat.tournament\"></span>\n                <span ng-bind=\"ctr.getTagInfo(1).stat.season\"></span>\n              </div>\n            </div>\n\n          </div>\n        </div>\n        <div class=\"teamReview\">\n          <div class=\"rightComment color\">\n            <label>\n              <i class=\"fa fa-eyedropper\"></i>\n              <div class=\"text\">Изменить цвет</div>\n              <input type=\"text\" class=\"colorPicker\" placement=\"top\" data-color-format=\"hex\" tag-num=\"1\" color-change=\"ctr.setColor(color, key)\" color-picker=\"ctr.getColor(1)\">\n            </label>\n          </div>\n          <div class=\"rightComment color left\">\n            <label>\n              <i class=\"fa fa-eyedropper\"></i>\n              <div class=\"text\">Изменить цвет</div>\n              <input type=\"text\" class=\"colorPicker\" placement=\"top\" data-color-format=\"hex\" tag-num=\"0\" color-change=\"ctr.setColor(color, key)\" color-picker=\"ctr.getColor(0)\">\n            </label>\n          </div>\n\n          <div class=\"team\" ng-style=\"{\'background-color\':ctr.getColor(0), \'color\':ctr.getTextColor(0)}\">\n            <a class=\"name link no-border\" ng-href=\"{{ctr.getTagInfo(0).team.tag_url}}\" ng-bind=\"ctr.getTagInfo(0).team.name\" ng-style=\"{\'color\':ctr.getTextColor(0)}\"></a>\n            <a class=\"logo\" target=\"_blank\" ng-href=\"{{ctr.getTagInfo(0).team.tag_url}}\" ng-style=\"{\'background-image\':\'url(\'+ctr.getTagInfo(0).team.logo+\')\'}\">\n            </a>\n          </div>\n\n          <div class=\"team right\" ng-style=\"{\'background-color\':ctr.getColor(1), \'color\':ctr.getTextColor(1)}\">\n            <a class=\"name link no-border\" ng-href=\"{{ctr.getTagInfo(1).team.tag_url}}\" ng-bind=\"ctr.getTagInfo(1).team.name\" ng-style=\"{\'color\':ctr.getTextColor(1)}\"></a>\n            <a class=\"logo\" target=\"_blank\" ng-href=\"{{ctr.getTagInfo(1).team.tag_url}}\" ng-style=\"{\'background-image\':\'url(\'+ctr.getTagInfo(1).team.logo+\')\'}\">\n            </a>\n          </div>\n\n        </div>\n\n        <div class=\"table\" ui-sortable=\"ctr.sortableOptions\">\n\n\n\n\n\n          <section class=\"stata std\" ng-class=\"{\'smalli\':ctr.sectionIsBanned(\'matches_count\')}\" data-panel-name=\"Матчи\">\n            <span class=\"remove\" ng-click=\"ctr.toggleSection(\'matches_count\')\">\n              <span class=\"r x\" ng-hide=\"ctr.sectionIsBanned(\'matches_count\')\"><i class=\"fa fa-remove\"></i>\n              </span>\n              <span class=\"a x\" ng-show=\"ctr.sectionIsBanned(\'matches_count\')\"><i class=\"fa fa-check\"></i>\n              </span>\n            </span>\n            <span class=\"reorder\" data-role=\"reorder\">\n              <i class=\"fa fa-bars\"></i>\n            </span>\n            <div class=\"inner\">\n              <h3>Матчи</h3>\n              <div class=\"left\">\n\n                <span class=\"field lefter\">\n                  минут на поле\n                  <div class=\"subcount\" ng-style=\"{\'color\':ctr.getColor(0)}\" ng-bind=\"ctr.getTagInfo(0).stat.minutes\"></div>\n                </span>\n                <span class=\"count\" ng-style=\"{\'color\':ctr.getColor(0)}\" ng-bind=\"ctr.getTagInfo(0).stat.matches_count\"></span>\n              </div>\n              <div class=\"right\">\n                <span class=\"count\" ng-style=\"{\'color\':ctr.getColor(1)}\" ng-bind=\"ctr.getTagInfo(1).stat.matches_count\"></span>\n                <span class=\"field\">\n                  минут на поле\n                  <div class=\"subcount\" ng-style=\"{\'color\':ctr.getColor(1)}\" ng-bind=\"ctr.getTagInfo(1).stat.minutes\"></div>\n                </span>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"stata std\" ng-class=\"{\'smalli\':ctr.sectionIsBanned(\'goals\')}\" data-panel-name=\"Голы\">\n            <span class=\"remove\" ng-click=\"ctr.toggleSection(\'goals\')\">\n              <span class=\"r x\" ng-hide=\"ctr.sectionIsBanned(\'goals\')\"><i class=\"fa fa-remove\"></i>\n              </span>\n              <span class=\"a x\" ng-show=\"ctr.sectionIsBanned(\'goals\')\"><i class=\"fa fa-check\"></i>\n              </span>\n            </span>\n            <span class=\"reorder\" data-role=\"reorder\">\n              <i class=\"fa fa-bars\"></i>\n            </span>\n            <div class=\"inner\">\n              <h3>Голы</h3>\n              <div class=\"left\">\n                <i class=\"fa fa-futbol-o ball\"></i>\n                <span class=\"count\" ng-style=\"{\'color\':ctr.getColor(0)}\" ng-bind=\"ctr.getTagInfo(0).stat.goals\"></span>\n              </div>\n              <div class=\"right\">\n                <span class=\"count\" ng-style=\"{\'color\':ctr.getColor(1)}\" ng-bind=\"ctr.getTagInfo(1).stat.goals\"></span>\n                <i class=\"fa fa-futbol-o ball\"></i>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"stata std\" ng-class=\"{\'smalli\':ctr.sectionIsBanned(\'goal_passes\')}\" data-panel-name=\"Передачи\">\n            <span class=\"remove\" ng-click=\"ctr.toggleSection(\'goal_passes\')\">\n              <span class=\"r x\" ng-hide=\"ctr.sectionIsBanned(\'goal_passes\')\"><i class=\"fa fa-remove\"></i>\n              </span>\n              <span class=\"a x\" ng-show=\"ctr.sectionIsBanned(\'goal_passes\')\"><i class=\"fa fa-check\"></i>\n              </span>\n            </span>\n            <span class=\"reorder\" data-role=\"reorder\">\n              <i class=\"fa fa-bars\"></i>\n            </span>\n            <div class=\"inner\">\n              <h3>Передачи</h3>\n              <div class=\"left\">\n                <span class=\"count\" ng-style=\"{\'color\':ctr.getColor(0)}\" ng-bind=\"ctr.getTagInfo(0).stat.goal_passes\"></span>\n              </div>\n              <div class=\"right\">\n                <span class=\"count\" ng-style=\"{\'color\':ctr.getColor(1)}\" ng-bind=\"ctr.getTagInfo(1).stat.goal_passes\"></span>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"stata rest std\" ng-class=\"{\'smalli\':ctr.sectionIsBanned(\'efficient_minutes\')}\" data-panel-name=\"Минут на результативное действие\">\n            <span class=\"remove\" ng-click=\"ctr.toggleSection(\'efficient_minutes\')\">\n              <span class=\"r x\" ng-hide=\"ctr.sectionIsBanned(\'efficient_minutes\')\"><i class=\"fa fa-remove\"></i>\n              </span>\n              <span class=\"a x\" ng-show=\"ctr.sectionIsBanned(\'efficient_minutes\')\"><i class=\"fa fa-check\"></i>\n              </span>\n            </span>\n            <span class=\"reorder\" data-role=\"reorder\">\n              <i class=\"fa fa-bars\"></i>\n            </span>\n            <div class=\"inner\">\n              <h3>Минут на\n                <br>результативное\n                <br>действие</h3>\n              <div class=\"left\">\n                <span class=\"count\" ng-style=\"{\'color\':ctr.getColor(0)}\" ng-bind=\"ctr.getTagInfo(0).stat.efficient_minutes\"></span>\n              </div>\n              <div class=\"right\">\n                <span class=\"count\" ng-style=\"{\'color\':ctr.getColor(1)}\" ng-bind=\"ctr.getTagInfo(1).stat.efficient_minutes\"></span>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"stata \" ng-class=\"{\'smalli\':ctr.sectionIsBanned(\'cardes\')}\" data-panel-name=\"Карточки\">\n            <span class=\"remove\" ng-click=\"ctr.toggleSection(\'cardes\')\">\n              <span class=\"r x\" ng-hide=\"ctr.sectionIsBanned(\'cardes\')\"><i class=\"fa fa-remove\"></i>\n              </span>\n              <span class=\"a x\" ng-show=\"ctr.sectionIsBanned(\'cardes\')\"><i class=\"fa fa-check\"></i>\n              </span>\n            </span>\n            <span class=\"reorder\" data-role=\"reorder\">\n              <i class=\"fa fa-bars\"></i>\n            </span>\n            <div class=\"inner\">\n              <div class=\"clearfix cardes\">\n                <div class=\"na2\">\n                  <span class=\"card r\"></span>\n                  <span class=\"counter\" ng-style=\"{\'color\':ctr.getColor(0)}\" ng-bind=\"ctr.getTagInfo(0).stat.red_cards\"></span>\n                  <span class=\"card y\"></span>\n                  <span class=\"counter\" ng-style=\"{\'color\':ctr.getColor(0)}\" ng-bind=\"ctr.getTagInfo(0).stat.yellow_cards\"></span>\n                </div>\n                <div class=\"na2\">\n                  <span class=\"card r\"></span>\n                  <span class=\"counter\" ng-style=\"{\'color\':ctr.getColor(1)}\" ng-bind=\"ctr.getTagInfo(1).stat.red_cards\"></span>\n                  <span class=\"card y\"></span>\n                  <span class=\"counter\" ng-style=\"{\'color\':ctr.getColor(1)}\" ng-bind=\"ctr.getTagInfo(1).stat.yellow_cards\"></span>\n                </div>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"stata full\" ng-class=\"{\'smalli\':ctr.sectionIsBanned(\'timeline\')}\" data-panel-name=\"Распределение голов по минутам\">\n            <span class=\"remove\" ng-click=\"ctr.toggleSection(\'timeline\')\">\n              <span class=\"r x\" ng-hide=\"ctr.sectionIsBanned(\'timeline\')\"><i class=\"fa fa-remove\"></i>\n              </span>\n              <span class=\"a x\" ng-show=\"ctr.sectionIsBanned(\'timeline\')\"><i class=\"fa fa-check\"></i>\n              </span>\n            </span>\n            <span class=\"reorder\" data-role=\"reorder\">\n              <i class=\"fa fa-bars\"></i>\n            </span>\n            <div class=\"inner\">\n              <h3>Распределение голов по минутам</h3>\n              <div class=\"clearfix\">\n                <div class=\"na2chart\">\n                  <div class=\"chart\" goals-timeline=\"ctr.getTagInfo(0).stat.goals_timeline\" color=\"ctr.getColor(0)\"></div>\n                </div>\n                <div class=\"na2chart\">\n                  <div class=\"chart\" goals-timeline=\"ctr.getTagInfo(1).stat.goals_timeline\" color=\"ctr.getColor(1)\"></div>\n                </div>\n              </div>\n            </div>\n          </section>\n\n\n\n          <section class=\"stata photogal\" ng-class=\"{\'smalli\':ctr.sectionIsBanned(\'photos\')}\" data-panel-name=\"Фотогалерея\">\n            <span class=\"remove\" ng-click=\"ctr.toggleSection(\'photos\')\">\n              <span class=\"r x\" ng-hide=\"ctr.sectionIsBanned(\'photos\')\"><i class=\"fa fa-remove\"></i>\n              </span>\n              <span class=\"a x\" ng-show=\"ctr.sectionIsBanned(\'photos\')\"><i class=\"fa fa-check\"></i>\n              </span>\n            </span>\n            <span class=\"reorder\" data-role=\"reorder\">\n              <i class=\"fa fa-bars\"></i>\n            </span>\n            <div class=\"inner\">\n              <div class=\"clearfix photos\">\n                <div class=\"na2\">\n\n                  <div>\n                    <carousel>\n                      <slide class=\"sslide\" ng-repeat=\"slide in ctr.getTagInfo(0).background_images\" active=\"slide.active\">\n                        <img ng-src=\"{{slide.url}}\" style=\"display:none;margin:auto;\">\n                        <div ng-style=\"{\'background-image\':\'url(\'+slide.url+\')\'}\"></div>\n                      </slide>\n                    </carousel>\n                  </div>\n\n\n                </div>\n                <div class=\"na2\">\n                  <div>\n                    <carousel>\n                      <slide class=\"sslide\" ng-repeat=\"slide in ctr.getTagInfo(1).background_images\" active=\"slide.active\">\n                        <img ng-src=\"{{slide.url}}\" style=\"display:none;margin:auto;\">\n                        <div ng-style=\"{\'background-image\':\'url(\'+slide.url+\')\'}\"></div>\n                      </slide>\n                    </carousel>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </section>\n\n\n          <section class=\"stata quoteView\" ng-class=\"{\'smalli\':ctr.sectionIsBanned(\'quote\')}\" data-panel-name=\"Цитата\">\n            <span class=\"remove\" ng-click=\"ctr.toggleSection(\'quote\')\">\n              <span class=\"r x\" ng-hide=\"ctr.sectionIsBanned(\'quote\')\"><i class=\"fa fa-remove\"></i>\n              </span>\n              <span class=\"a x\" ng-show=\"ctr.sectionIsBanned(\'quote\')\"><i class=\"fa fa-check\"></i>\n              </span>\n            </span>\n            <span class=\"reorder\" data-role=\"reorder\">\n              <i class=\"fa fa-bars\"></i>\n            </span>\n            <div class=\"inner clearfix\">\n              <div class=\"na2\">\n                <textarea class=\"form-control\" ng-model=\"ctr.getTagInfo(0).quote\" placeholder=\"Сюда вы можете написать цитату об игроке\"></textarea>\n                <input class=\"form-control\" type=\"text\" ng-model=\"ctr.getTagInfo(0).quoteAuthor\" placeholder=\"Подпись к цитате\">\n              </div>\n              <div class=\"na2\">\n                <textarea class=\"form-control\" ng-model=\"ctr.getTagInfo(1).quote\" placeholder=\"Сюда вы можете написать цитату об игроке\"></textarea>\n                <input class=\"form-control\" type=\"text\" ng-model=\"ctr.getTagInfo(1).quoteAuthor\" placeholder=\"Подпись к цитате\">\n              </div>\n            </div>\n          </section>\n\n        </div>\n      </section>\n    </div>\n  </div>\n</section>\n");}]);