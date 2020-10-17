// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 40,
    right: 80,
    bottom: 60,
    left: 100
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
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });

    var xLinearScale = d3.scaleLinear()
        .range([0, width])
        .domain(d3.extent(data, d => d.poverty));

    var yLinearScale = d3.scaleLinear()
        .range([height, 0])
        .domain(d3.extent(data, d => d.healthcare));
        
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", "10")
            .attr("fill", "blue")
            .style("opacity", 0.4)
            //.attr("stroke-width", "0")
            //.attr("stroke", "black")
    
    var elemEnter = chartGroup.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", d => `translate(${xLinearScale(d.poverty)} , ${yLinearScale(d.healthcare)})`)

    elemEnter.append("text")
        .attr("dx", function(d){return -8})
        .attr("dy", function(d){return +4})
        .attr("fill", "white")
        .text(function(d) {return d.abbr})
        .style("font-size", "10px");
    
});
