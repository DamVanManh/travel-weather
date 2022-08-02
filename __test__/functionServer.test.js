import { gettrips } from "../src/server/tripFn";
describe("Testing get trip data", () => {
  test("Get trip ok", async () => {
    const data = gettrips();
    expect(data).not.toBeFalsy();
  });
});
