;(function(){'use strict';
angular.module('a3')
.visualization('donut', function(svg, scope){
  var currAngle = 0;
  var scale = d3.scale.linear()
  .range([0, 2 * Math.PI])
  .domain([0, d3.sum(scope.data, function(d){
    return d;
  })]);

  var arc = d3.svg.arc()
  .innerRadius('50')
  .outerRadius('100')
  .startAngle(function(){
    return currAngle;
  })
  .endAngle(function(d){
    var scaled = scale(d);
    var res = scaled + currAngle;
    currAngle = res;
    return res;
  });

  svg.selectAll('path')
  .data(scope.data)
  .enter().append('path')
  .attr('class',  function(d, i){
    return 'arc' + i;
  })
  .attr('stroke-width', 0)
  .attr('transform', 'translate(100, 100)')
  .attr('d', arc);

  //svg.selectAll('path').data(scope.data).enter();
});
}());
