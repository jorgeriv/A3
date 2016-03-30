;(function(){'use strict';
angular.module('a3')
	.visualization('radial-progress', function(svg, scope){
	var width = scope.innerWidth;
	var height = scope.innerHeight;
	var y = d3.scale.linear()
	.range([height, 0])
	.domain([0, d3.max(scope.data, function(d) { return d; })]);

  var arc = d3.svg.arc()
    .innerRadius(90)
    .outerRadius(100)
    .startAngle(1 * Math.PI)
    .endAngle(2.5 * Math.PI);
    //.centroid(60, 0);
    console.log(arc.centroid());

	var slice = svg.selectAll('g')
	.data(scope.data)
	.enter().append('g');

	slice.append('path')
	.attr('class',  'arc')
  .attr('transform', 'translate(100, 100)')
  .attr('d', arc);
});
}());
