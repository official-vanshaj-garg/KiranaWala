// This is a simple placeholder test file to verify Jest setup

// describe groups related tests together
describe("Sample Test Suite", () => {
  // test defines an individual test case
  test("should add two numbers correctly", () => {
    // expect is used to make assertions
    // toBe is a "matcher" that checks for strict equality
    expect(1 + 1).toBe(2);
  });

  test("should demonstrate a basic truthy check", () => {
    expect(true).toBeTruthy();
  });
});
