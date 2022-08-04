const horsey = require("horsey");
/**
 * @description Handle autocomplete function of the input form
 */
async function autocomplete() {
  horsey(document.getElementById("location"), {
    source: async (data, done) => {
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

export { autocomplete };
