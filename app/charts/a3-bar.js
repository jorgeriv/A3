;(function(){'use strict';
angular.module('a3')
	.visualization('bar', function(svg, scope){
	var width = scope.innerWidth;
	var height = scope.innerHeight;
	var barWidth = width/scope.data.length;
	var y = d3.scale.linear()
	.range([height, 0])
	.domain([0, d3.max(scope.data, function(d) { return d; })]);
	var bar = svg.selectAll('g')
	.data(scope.data)
	.enter().append('g');

	bar.append('rect')
	.attr('x', function(d, i) {return i * barWidth; })
	.attr('y', function(d) {return y(d);})
	.attr('height', function(d) { return height - y(d); })
	.attr('width', function(){ return  barWidth - 1;});
});
}());
