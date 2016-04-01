;(function(){'use strict';

var a3 = angular.module('a3');

// Main directive
function a3directive(){
	function link(scope, el, attr){
		var vpHeight, vpWidth, vbHeight, vbWidth, ar;
		ar = '1:1'; // aspect ratio
		vpHeight = vpWidth = vbHeight = vbWidth = 200; // Default viewPort and viewBox width and height
		vpWidth = parseInt(attr.width, 10) || vpWidth;
		vpHeight = parseInt(attr.height, 10) || vpHeight;
		//vbWidth = Math.ceil((vbWidth/vpWidth) * vpWidth);
		//vbHeight = Math.ceil((vbHeight/vpHeight) * vpHeight);
		var svg = d3.select(el[0]).append('svg')
			.attr({
				width: vpWidth,
				height: vpHeight,
				viewBox: '0 0 ' + vbWidth + ' ' + vbHeight,
				preserveAspectRatio: 'xMidYMid meet',
				version:'1.1'
			});


		var margin = {top: 10, right: 10, bottom: 20, left: 20};
		    scope.innerWidth = vpWidth - margin.left - margin.right;
		    scope.innerHeight = vpHeight - margin.top - margin.bottom;
		var xScale = d3.scale.linear()
			.domain([0, scope.data.length])
			.range([0, scope.innerWidth]);
		var yScale = d3.scale.linear()
			.domain([
				0,
				d3.max(scope.data, function(d){return d;})
			])
			.range([scope.innerHeight, 0]);
		var inner = svg.append('g')
		    //.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		var xAxis = d3.svg.axis()
		    .scale(xScale)
		    .orient('bottom');
		var yAxis = d3.svg.axis()
		    .scale(yScale)
		    .orient('left');
/*
		svg.append('g')
		    .attr('class', 'x axis')
		    .attr('transform', 'translate(' + margin.left +',' + (vpHeight- margin.bottom) + ')')
		    .call(xAxis);
		svg.append('g')
		    .attr('class', 'y axis')
		    .attr('transform', 'translate(' + margin.left + ','+margin.top+')')
		    .call(yAxis);
*/
		var plot = function plot(type){
			a3.types[type](inner, scope);
		};
		var visualizations = scope.type.split(',');
		visualizations.forEach(plot);
	}
	return {
		restrict: 'E',
		link: link,
		scope: {data: '=', type: '@'}
	};
}

a3.directive('a3',[a3directive]);
}());
