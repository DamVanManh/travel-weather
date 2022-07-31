const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios").default;
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/infotrip", async function (req, res) {
  const startDate = new Date().toISOString().slice(0, 10);
  const endDate = req.body.dateArrival;
  const diffInMs = new Date(endDate) - new Date(startDate);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  const urlForecast =
    diffInDays <= 7
      ? "http://api.weatherbit.io/v2.0/current"
      : "https://api.weatherbit.io/v2.0/forecast/daily";

  console.log("diffInDays ", diffInDays);
  try {
    const [geonamesData, pixabayData] = await Promise.all([
      axios({
        method: "get",
        url: "http://api.geonames.org/searchJSON",
        params: {
          maxRows: 1,
          username: process.env.GEONAMES_USER,
          name: req.body.location,
        },
      }),
      axios({
        method: "get",
        url: "https://pixabay.com/api/",
        params: {
          key: process.env.PIXABAY_KEY,
          q: req.body.location,
          image_type: "photo",
          editors_choice: true,
          per_page: 3,
        },
      }),
    ]);

    const weatherbitData = await axios({
      method: "get",
      url: urlForecast,
      params: {
        lat: geonamesData.data.geonames[0].lat,
        lon: geonamesData.data.geonames[0].lng,
        key: process.env.WEATHERBIT_KEY,
      },
    });

    // console.log("geonames ", geonamesData.data.geonames[0]);
    // console.log("pixabayData ", pixabayData.data);
    // console.log("weatherbitData ", weatherbitData.data);

    const targetWeatherbitData =
      diffInDays <= 7
        ? weatherbitData.data.data[0]
        : weatherbitData.data.data[diffInDays];
    const destination = req.body.location;
    const dateArrival = req.body.dateArrival;
    const imgURL = pixabayData.data.hits[0].largeImageURL;
    const iconWeatherbitURL = `https://www.weatherbit.io/static/img/icons/${targetWeatherbitData.weather.icon}.png`;
    const temp = targetWeatherbitData.temp;
    const description = targetWeatherbitData.weather.description;
    const relativeHumidity = targetWeatherbitData.rh;
    const windSpeed = targetWeatherbitData.wind_spd;

    res.send({
      imgURL,
      destination,
      dateArrival,

      iconWeatherbitURL,
      temp,
      relativeHumidity,
      windSpeed,
      description,

      targetWeatherbitData,
    });
  } catch (error) {
    console.error("something went wrong", error);
  }
});

const atrip = {
  destination: "",
  dateArrival: "",
  imgURL: "",
  iconURL: "",
  destination: "",
  temp: "",
  description: "",
};

let port = process.env.PORT || 8081;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log("App listening on port 8081!");
});
