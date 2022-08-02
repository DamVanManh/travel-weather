const horsey = require("horsey");
let timeOut;
const waitFor = (delay) =>
  new Promise((resolve) => {
    timeOut = setTimeout(resolve, delay);
  });
async function autocomplete() {
  horsey(document.getElementById("location"), {
    source: async (data, done) => {
      clearTimeout(Client.timeOut);
      await waitFor(300);
      const q = document.getElementById("location").value;
      const source = await Client.getGeonamesData(q);

      const items = source.geonames.map((item) => item.name);
      done(null, [
        {
          list: items,
        },
      ]);
    },
  });
}

export { autocomplete, timeOut };
