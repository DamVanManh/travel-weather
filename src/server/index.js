const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios").default;
const tripFn = require("./tripFn.js");
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

app.post("/saveTrip", async function (req, res) {
  tripFn.addTrip(req.body);
  res.send(tripFn.gettrips());
});

app.get("/gettrips", async function (req, res) {
  res.send(tripFn.gettrips());
});

app.post("/removeTrip", async function (req, res) {
  tripFn.removeTrip(({ destination, dateArrival } = req.body));
  res.send(tripFn.gettrips());
});

app.post("/getgeonamesdata", async function (req, res) {
  try {
    const geonames = await axios({
      method: "get",
      url: "http://api.geonames.org/searchJSON",
      params: {
        maxRows: 10,
        username: process.env.GEONAMES_USER,
        q: req.body.q,
        style: "short",
      },
    });
    res.send(geonames.data);
  } catch (error) {
    console.error("something went wrong", error);
  }
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

    if (geonamesData.data.totalResultsCount === 0) {
      return res.status(404).send();
    }

    const weatherbitData = await axios({
      method: "get",
      url: urlForecast,
      params: {
        lat: geonamesData.data.geonames[0].lat,
        lon: geonamesData.data.geonames[0].lng,
        key: process.env.WEATHERBIT_KEY,
      },
    });

    const targetWeatherbitData =
      diffInDays <= 7
        ? weatherbitData.data.data[0]
        : weatherbitData.data.data[diffInDays];
    const defaultImage =
      "https://pixabay.com/get/g4d697ceca02a3e4b6bd463c98150a580a32b792a07989e5c284ff4c61a4bf2a94b17b9819c34ce4c860420870b44c8acda32fdf2aac9730237e294e2e72d5498_1280.jpg";
    const destination = req.body.location;
    const dateArrival = req.body.dateArrival;
    const imgURL =
      pixabayData.data.total === 0
        ? defaultImage
        : pixabayData.data.hits[0].largeImageURL;
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
    });
  } catch (error) {
    console.error("something went wrong", error);
  }
});

let port = process.env.PORT || 8081;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log("App listening on port 8081!");
});
