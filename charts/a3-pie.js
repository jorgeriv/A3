'use strict';

a3.directive('pieChart', function(){
      function link(scope, el, attr){
        var color = d3.scale.category10();
        var svg = scope.svg;
        var min = Math.min(width, height);
        var pie = d3.layout.pie().sort(null);
        var arc = d3.svg.arc()
          .outerRadius(min / 2 * 0.9)
          .innerRadius(min / 2 * 0.5);

        pie.value(function(d){ return d.value; });
    
        var g = svg.append('g')
          // center the donut chart
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
        
        // add the <path>s for each arc slice
        var arcs = g.selectAll('path');

        scope.$watch('data', function(data){
          arcs = arcs.data(pie(data));
          arcs.enter().append('path')
            .style('stroke', 'white')
            .attr('fill', function(d, i){ return color(i) });
          arcs.exit().remove();
          arcs.attr('d', arc);
        }, true);
      }
      return {
        link: link,
        restrict: 'E',
        scope: { data: '=' }
      };
    });