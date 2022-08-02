import { getGeonamesData } from "../src/client/js/api";
describe("Testing client api getGeonamesData", () => {
  const notFoundData = {
    totalResultsCount: 0,
    geonames: [],
  };
  test("Testing input ok", async () => {
    const data = await getGeonamesData("hanoi");
    expect(data).not.toBe(notFoundData);
  });

  test("Testing input no ok", async () => {
    const data = await getGeonamesData("#$k909");
    expect(data).toMatchObject(notFoundData);
  });
});
