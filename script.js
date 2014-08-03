function Show(data) {
  for (property in data) {
    if (data.hasOwnProperty(property)) {
      this[property] = data[property];
    }
  }
}

Show.prototype = {
  toMinutes: function(string) {
    var parts = string.split("h"),
        hours = Number(parts[0]),
        minutes = Number(parts[1]);
    return hours * 60 + minutes;
  },
  duration: function() {
    return (this.toMinutes(this.endTime)
            - this.toMinutes(this.startTime));
  }
};


// scale: 1440 minutes per day
d3.json("output/fmr.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;
});
