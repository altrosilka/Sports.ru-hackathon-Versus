angular.module('App').directive('customSelect', function() {
  return {
    transclude: true,
    scope: {
      selectId: '=customSelect',
      closeOnSelect: '=',
      options: '=',
      sectionFormat: '=',
      sectionDefault: '=',
      optionFormat: '=',
      optionDisabled: '&',
      optionActive: '&',
      onSelect: '&',
      options: '=',
      customContent: '='
    },
    controller: 'CD_customSelect as cSCtr',
    templateUrl: 'templates/directives/customSelect.html',
    link: function(scope, element, attrs, ctrl, transclude) {
      var parent = scope.$parent.$new();
      var current = scope;

      transclude(parent, function(clone, scope) {
        scope.$close = current.cSCtr.close;
        element.find('[data-role="custom-content"]').append(clone);
      });

      element.find('menu').on('click', function(event) {
        event.stopPropagation();
      });
    }
  }
})
