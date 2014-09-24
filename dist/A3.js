/*! A3 - v0.0.1 - 2014-09-24
* Copyright (c) 2014 ; Licensed  */
'use strict';

var a3 = angular.module('a3', []);

// Main directive
a3.directive('a3', function(){
	function link(scope, el, attr){
		scope.width = parseInt(attr.width, 10) || 200;
		scope.height = parseInt(attr.height, 10) || 200;
		var svg = d3.select(el[0]).append('svg')
			.attr({width: scope.width, height: scope.height});
		var margin = {top: 10, right: 10, bottom: 20, left: 20};
		    scope.innerWidth = scope.width - margin.left - margin.right;
		    scope.innerHeight = scope.height - margin.top - margin.bottom;
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
		    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		var xAxis = d3.svg.axis()
		    .scale(xScale)
		    .orient('bottom');
		var yAxis = d3.svg.axis()
		    .scale(yScale)
		    .orient('left');
		svg.append('g')
		    .attr('class', 'x axis')
		    .attr('transform', 'translate(' + margin.left +',' + (scope.height- margin.bottom) + ')')
		    .call(xAxis);
		svg.append('g')
		    .attr('class', 'y axis')
		    .attr('transform', 'translate(' + margin.left + ','+margin.top+')')
		    .call(yAxis);

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
});

a3.visualization = function(name, func){
	this.types = this.types || {};
	if(!name && !func){
		throw new Error('Missing parameters for visualization');
	}
	this.types[name] = func;
	return this.types[name];
};