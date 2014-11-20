angular.module('App').directive('autocompleteArea', [function() {
  return {
    scope: {
      info: '=',
      withButton: '=',
      info: '=',
    },
    templateUrl: 'templates/directives/autocompleteArea.html',
    controller: 'CD_autocompleteArea as ctr',
    link: function($scope, $element, $attrs, CD_autocompleteArea) {
      if ($scope.withButton) {
        var className = 'notShowing';
        var input = $element.find('input');
        var mover = $(document.createElement('div')).html('Сравнить с другим игроком').addClass('onfocusbutton btn btn-primary').on('click', function() {
          input.trigger('focus');
          $(this).addClass(className);
        }).appendTo($element.find('[data-role="area"]'));

        input.on('blur', function() {
          if ($(this).val() === '') {
            mover.removeClass(className);
          }
        });
      }
    }
  }
}])
