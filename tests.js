describe("Show", function() {
  var Show = RadioLD.Show;
  beforeEach(function() {
    this.data = {
      "startTime": "01h",
      "endTime": "02H",
      "title": "The title",
      "day": "LUNDI"
    };
  });
  it("should receive data attributes", function() {
    var show = new Show(this.data);
    expect(show.title).toBe("The title");
  }),
  describe("duration", function() {
    it("should return duration in minutes for round hours", function() {
      var show = new Show(this.data);
      expect(show.duration()).toBe(60);
    });
    it("should return duration in minutes for non-round hours", function() {
      var data = {"startTime": "01h", "endTime": "02h30"};
      var show = new Show(data);
      expect(show.duration()).toBe(90);
    });
  });
  describe("startMinute", function() {
    it("should return start time in minutes", function() {
      var show = new Show({startTime: "01h30"});
      expect(show.startMinute()).toBe(90);
    });
  });
  describe("dayIndex", function() {
    it("should return zero-indexed day of the week", function() {
      var show = new Show(this.data);
      expect(show.dayIndex()).toBe(0);
    });
  });
});

describe("drawProgram", function() {
  return;
  var drawProgram = RadioLD.drawProgram;
  beforeEach(function() {
    this.container = document.getElementById("jasmine_content");
    this.container.appendChild(document.createElement("svg"));
  });
  afterEach(function() {
    this.container.innerHTML = "";
  });
  it("should insert an svg element", function() {
    drawProgram(this.container);
    expect(document.querySelectorAll("svg").length).toBe(1);
  });
  it("should insert a circle", function() {
    drawProgram(this.container);
    expect(document.querySelectorAll("circle").length).toBe(1);
  });
});
