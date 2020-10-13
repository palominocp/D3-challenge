// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 30,
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select('#scatter')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("/assets/data/data.csv").then((data) => {

    data.forEach(d => {
        d.age = +d.age;
        d.smokes = +d.smokes;
    });

    var xLinearScale = d3.scaleLinear().range([0, width])
        .domain(d3.extent(data, d => d.age));

    var yLinearScale = d3.scaleLinear().range([height, 0])
        .domain(d3.extent(data, d => d.smokes));
        
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale).ticks(6);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", d => xLinearScale(d.age))
            .attr("cy", d => yLinearScale(d.smokes))
            .attr("r", "10")
            .attr("fill", "gold")
            .attr("stroke-width", "1")
            .attr("stroke", "black")
    
    var elem = chartGroup.selectAll("g")
        .data(data);

    var elemEnter = elem.enter()
        .append("g")
        .attr("transform", d => `translate(${xLinearScale(d.age)} , ${yLinearScale(d.smokes)})`)

    elemEnter.append("text")
        .attr("dx", function(d){return -10})
        .attr("dy", function(d){return +5})
        .attr("fill", "black")
        .text(function(d){return d.abbr});
    
});
