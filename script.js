/* jshint browser: true */
/* globals d3 */
var RadioLD = (function() {  // begin module

"use strict";

function Show(data) {
  for (var property in data) {
    if (data.hasOwnProperty(property)) {
      this[property] = data[property];
    }
  }
}

Show.days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

Show.prototype = {
  toMinutes: function(string) {
    var parts = string.toLowerCase().split("h"),
        hours = Number(parts[0]),
        minutes = Number(parts[1]);
    return hours * 60 + minutes;
  },
  duration: function() {
    var endTime = this.toMinutes(this.endTime),
        startTime = this.toMinutes(this.startTime),
        result = endTime - startTime;
    if (result < 0) { // Crosses midnight
      endTime += 24 * 60;
    }
    return (endTime - startTime);
  },
  startMinute: function() {
    var result = this.toMinutes(this.startTime) - (60 * 7);
    if (result < 0) {
      result = (24 * 60) + result;
    }
    return result;
  },
  dayIndex: function() {
    return Show.days.indexOf(this.day.toLowerCase());
  }
};

function drawProgram(svg, data) {
  var width = 2300,
      height = 500,
      rowHeight = height / 7,
      cellSpacing = 2;

  var x = d3.scale.linear()
    .range([0, width])
    .domain([0, 60 * 24]);

  var y = d3.scale.linear()
    .range([0, height - rowHeight])
    .domain([0, 6]);

  var program = d3.select(svg)
    .attr("width", width)
    .attr("height", height);

  var block = program.selectAll("g")
      .data(data)
    .enter().append("g");
  block.append("rect")
    .attr("x", function(d) { return x(d.startMinute()); })
    .attr("y", function(d) { return y(d.dayIndex()); })
    .attr("fill", "#ff8705")
    .attr("height", rowHeight - cellSpacing)
    .attr("width", function(d) { return x(d.duration()) - cellSpacing; });
  var switchElement = block.append("switch");
  var htmlBody = switchElement.append("foreignObject")
    .attr("x", function(d) { return x(d.startMinute()); })
    .attr("y", function(d) { return y(d.dayIndex()); })
    .attr("width", function(d) { return x(d.duration()) - cellSpacing; })
    .attr("height", rowHeight)
    .attr("requiredExtensions", "http://www.w3.org/1999/xhtml")
    .append("xhtml:body")
      .attr("xmlns", "http://www.w3.org/1999/xhtml");
   htmlBody.append("xhtml:p")
     .text(function(d) { return d.startTime + " - " + d.endTime; });
   htmlBody.append("xhtml:p")
     .text(function(d) { return d.title; });
  switchElement.append("text")
    .attr("x", function(d) { return x(d.startMinute()); })
    .attr("y", function(d) { return y(d.dayIndex()); })
    .attr("dy", "1.75em")
    .attr("dx", "0.75em")
    .text(function(d) { return d.startTime + " " + d.title; });
}

d3.json("output/fmr.json", function(error, json) {
  if (error) {
    return console.warn(error);
  }
  var data = json.map(function(item) { return new Show(item); });
  RadioLD.drawProgram(document.getElementById("program"), data);
});

return {Show: Show, drawProgram: drawProgram};

}());  // end module
