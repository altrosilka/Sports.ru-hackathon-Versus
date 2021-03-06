angular.module('App').directive('goalsTimeline', [function() {
  return {
    scope: {
      data: '=goalsTimeline',
      color: '=',
      printedMode: '='
    },
    link: function($scope, $element, $attrs) {
      var chart, $canvas;
      $scope.$watch('color', function(color) {
        if (!color || !chart) return;

        if ($scope.data) {
          _.forEach(chart.highcharts().series, function(el) {

            el.options.color = color;
            el.update(el.options);
          })
        }
      });

      $scope.$watch('printedMode', function(print, old) {
        if (!print || !print || !chart) return;

        if (print === true) {
          var q = $element;
          var w = q.width();
          var h = q.height();
          var id = "asge"+Math.random().toString(36).substring(7);
          $canvas = $('<canvas class="weit" id="'+id+'" width="'+w+'px" height="'+h+'px"></canvas>').insertAfter($element);
          var svg = chart.find('.highcharts-container').html();
          
          canvg(document.getElementById(id), svg);
          $element.hide();
        }

        if (print === false && old === true) {
          $canvas.remove();
          $element.show();
        }
      });

      $scope.$watch('data', function(data) {
        if (!data) return;

        var categories = [];
        var max = _.max(data, function(e) {
          categories.push(e.period);
          return e.goals_count;
        }).goals_count;

        var boys = [];
        var series


        var series = [];

        for (var i = 0; i < max; i++) {
          var arr = [];
          _.forEach(data, function(e) {
            arr.push((e.goals_count > i) ? 1 : 0);
          });
          series.push({
            data: arr,
            color: $scope.color
          });
        }

        if(max === 0){
          $element.addClass('empty')
          return;
        }
        
        chart = $element.highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: null
          },
          xAxis: {
            categories: categories
          },
          yAxis: {
            min: 0,
            lineWidth: 0,
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            lineColor: 'transparent',
            title: {
              text: null
            },
            labels: {
              enabled: false
            },
            minorTickLength: 0,
            tickLength: 0,
            stackLabels: {
              enabled: true,
              style: {
                fontSize: '22px',
                bottom: '10px',
                color: (Highcharts.theme && Highcharts.theme.textColor) || '#000'
              }
            }
          },
          legend: {
            enabled: false
          },
          tooltip: {
            enabled: false,
            formatter: function() {
              return '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y + '<br/>' +
                'Total: ' + this.point.stackTotal;
            }
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              animation: false,
              dataLabels: {
                enabled: false
              }
            },
            series: {
              states: {
                hover: {
                  enabled: false
                }
              }
            }
          },
          series: series
        });
        chart.find('text:contains("Highcharts.com")').remove();
      });
    }
  }
}])
