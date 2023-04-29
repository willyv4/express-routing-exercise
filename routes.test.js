const { getMode, getMedian, getMean } = require("./helpers");

describe("test routes", () => {
  test("should provide mean", () => {
    const res = getMean("1,2,3,4");
    expect(res).toEqual(2.5);
  });

  test("should provide mode", () => {
    const res = getMode("5,3,7,5,3,3");
    expect(res).toEqual(3);
  });

  test("should provide median", () => {
    const res = getMedian("2,67,54,8,4,32");
    expect(res).toEqual(20);
  });
});
