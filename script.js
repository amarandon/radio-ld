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
    return (this.toMinutes(this.endTime) - this.toMinutes(this.startTime));
  },
  startMinute: function() {
    return this.toMinutes(this.startTime);
  },
  dayIndex: function() {
    return Show.days.indexOf(this.day.toLowerCase());
  }
};

function drawProgram(svg, data) {
  var width = 3000,
      height = 500,
      rowHeight = height / 7;

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
    .attr("fill", "#ccc")
    .attr("height", rowHeight - 1)
    .attr("width", function(d) { return x(d.duration()) - 1; });
  var switchElement = block.append("switch");
  switchElement.append("foreignObject")
      .attr("x", function(d) { return x(d.startMinute()); })
      .attr("y", function(d) { return y(d.dayIndex()); })
      .attr("width", function(d) { return x(d.duration()) - 1; })
      .attr("height", rowHeight)
      .attr("requiredExtensions", "http://www.w3.org/1999/xhtml")
      .append("xhtml:body")
        .attr("xmlns", "http://www.w3.org/1999/xhtml")
        .append("xhtml:p")
          .text(function(d) { return d.startTime + " " + d.title; });
  switchElement.append("text")
    .attr("x", function(d) { return x(d.startMinute()); })
    .attr("y", function(d) { return y(d.dayIndex()); })
    .attr("dy", "1.75em")
    .attr("dx", "0.75em")
    .text(function(d) { return d.startTime + " " + d.title; });
}

d3.json("output/fmr.json", function(error, json) {
  if (error) return console.warn(error);
  var data = json.map(function(item) { return new Show(item); });
  RadioLD.drawProgram(document.getElementById("program"), data);
});

return {Show: Show, drawProgram: drawProgram};

}());  // end module
