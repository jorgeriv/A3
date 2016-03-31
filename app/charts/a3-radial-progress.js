;(function(){'use strict';
angular.module('a3')
.visualization('radial-progress', function(svg, scope){
  var width = scope.innerWidth;
  var height = scope.innerHeight;
  var scale = d3.scale.linear()
  .range([Math.PI, 3 * Math.PI])
  .domain([0, 100]);

  var arc_back = d3.svg.arc()
  .innerRadius(95)
  .outerRadius(95)
  .startAngle(0)
  .endAngle(2 * Math.PI);

  var arc = d3.svg.arc()
  .innerRadius(95)
  .outerRadius(95)
  .startAngle(1 * Math.PI)
  .endAngle(function(d){
    return scale(d);
  });

  var slice = svg.selectAll('g')
  .data(scope.data)
  .enter().append('g');

  slice.append('path')
  .attr('class',  'arc-back')
  .attr('stroke-width', 8)
  //.attr('stroke-linejoin', 'round')
  .attr('transform', 'translate(100, 100)')
  .attr('d', arc_back);

  slice.append('path')
  .attr('class',  'arc')
  .attr('stroke-width', 8)
  //.attr('stroke-linejoin', 'round')
  .attr('transform', 'translate(100, 100)')
  .attr('d', arc);

  slice.append('text')
  .attr({
    x: 100,
    y: 100,
    'text-anchor': 'middle'
  })
  .text(function(d){
    return d + '%';
  });
});
}());
