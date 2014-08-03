describe("RadioShow", function() {
  beforeEach(function() {
    this.data = {
      "startTime": "01h",
      "endTime": "02h",
      "title": "The title"
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
});
