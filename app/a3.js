;(function(){'use strict';
var a3 = angular.module('a3', []);

a3.visualization = function(name, func){
	this.types = this.types || {};
	if(!name && !func){
		throw new Error('Missing parameters for visualization');
	}
	this.types[name] = func;
	return this.types[name];
};
}());
