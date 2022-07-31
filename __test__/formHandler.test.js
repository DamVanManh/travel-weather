import { testJest } from "../src/client/js/formHandler";
describe("Testing the handleSubmit functionality", () => {
  test("handleSubmit running", () => {
    const spy = jest.spyOn(testJest, "play");
    const isPlaying = testJest.play();

    expect(spy).toHaveBeenCalled();
    expect(isPlaying).toBe(true);
  });
});
