'use strict';

a3.visualization('line', function(svg, scope){
	var width = scope.innerWidth;
	var height = scope.innerHeight;
	var x = d3.scale.linear()
		.domain([0, scope.data.length])
		.range([0, width]);
	var y = d3.scale.linear()
		.domain([
			0,
			d3.max(scope.data, function(d){return d;})
		])
		.range([height, 0]);
	var line =  d3.svg.line()
				.x(function(d, i){ return x(i); })
				.y(function(d){ return y(d); })
				.interpolate('linear');
	svg = svg.append('g')
	.append('path')

  .attr('d', line(scope.data))
  .attr('stroke', 'red')
  .attr('stroke-width', 1)
  .attr('fill', 'none');

	//.datum(scope.data)
	//.attr('class', 'line')
	//.attr('d', line);
});