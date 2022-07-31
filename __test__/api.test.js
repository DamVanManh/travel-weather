import { analysisSentiment } from "../src/client/js/api";
describe("Testing the analysisSentiment functionality", () => {
  test("Testing input ok", async () => {
    const data = await analysisSentiment("http://localhost:8081/analysis", {
      text: "test a JavaScript Testing Framework",
    });
    expect(data).toMatchObject({
      status: {
        code: "0",
        credits: "1",
        msg: "OK",
      },
    });
  });

  test("Testing input no ok", async () => {
    const data = await analysisSentiment("http://localhost:8081/analysis", {
      text: "",
    });
    expect(data).toMatchObject({
      status: {
        code: "200",
        credits: "0",
        msg: expect.stringMatching(/^(?!(OK)$).*$/),
      },
    });
  });
});
