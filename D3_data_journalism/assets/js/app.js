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

// Create an SVG wrapper
var svg = d3
    .select('#scatter')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

// Append an SVG group and shift it by left and top margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Labels
var xLabel = "In Poverty (%)";
var yLabel = "Lacks Healthcare (%)";

// Retrieve data from the CSV file and execute everything below
d3.csv("/assets/data/data.csv").then((data) => {

    // Parse data
    data.forEach(d => {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });

    
    // Create x scale function
    var xLinearScale = d3.scaleLinear()
        .range([0, width])
        .domain([8, d3.max(data, d => d.poverty)+2]);

    // Create y scale function
    var yLinearScale = d3.scaleLinear()
        .range([height, 0])
        .domain([4, d3.max(data, d => d.healthcare)+2]);
    
    // Create axis functions
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // append x axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    // append y axis
    chartGroup.append("g")
        .call(yAxis);

    // append circles
    chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", "10")
            .attr("fill", "rgb(136, 187, 213)")

    // Add abbreviations in the circles
    chartGroup.selectAll("circles")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", d => `translate(${xLinearScale(d.poverty)} , ${yLinearScale(d.healthcare)})`)
        .append("text")
            .attr("dx", function(d){return -8})
            .attr("dy", function(d){return +4})
            .attr("fill", "white")
            .text(function(d) {
                console.log(d.abbr);
                return d.abbr;
            })
            .style("font-size", "10px");

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text(yLabel);

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 5})`)
        .attr("class", "aText")
        .text(xLabel);
    
});
