/* jshint browser: true */
/* global beforeEach, afterEach, describe, it, expect, RadioLD */
describe("RadioLD", function() {
  "use strict";
  var Show = RadioLD.Show;
  beforeEach(function() {
    this.data = {
      startTime: "01h",
      endTime: "02H",
      title: "The title",
      day: "LUNDI"
    };
  });
  it("should receive data attributes", function() {
    var show = new Show(this.data);
    expect(show.title).toBe("The title");
  });
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
  describe("drawProgram", function() {
    var drawProgram = RadioLD.drawProgram;
    beforeEach(function() {
      this.container = document.getElementById("jasmine_content");
      this.container.appendChild(document.createElement("svg"));
      expect(document.querySelectorAll("svg").length).toBe(1);
    });
    afterEach(function() {
      this.container.innerHTML = "";
    });
    it("should insert a rectangle", function() {
      drawProgram(this.container, [new Show(this.data)]);
      expect(document.querySelectorAll("rect").length).toBe(1);
    });
  });
});
