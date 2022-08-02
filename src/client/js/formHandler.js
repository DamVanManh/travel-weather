let currentTrip = null;
async function handleSubmit(event) {
  event.preventDefault();
  const location = document.getElementById("location").value;
  const dateArrival = document.getElementById("date").value;
  if (Client.isFormInvalid()) {
    return;
  }

  const inFoTripData = await Client.getInFoTrip({ location, dateArrival });

  if (inFoTripData.response && inFoTripData.response.status === 404) {
    Client.isFormInvalid(inFoTripData.response.statusText);
    return;
  }

  currentTrip = inFoTripData;

  document.getElementById(
    "results"
  ).style.background = `url(${inFoTripData.imgURL}) center/contain round`;

  document.getElementById("destination").textContent = inFoTripData.destination;

  document.getElementById("arrival-date").textContent =
    inFoTripData.dateArrival;

  document
    .getElementById("iconWeatherbitURL")
    .setAttribute("src", inFoTripData.iconWeatherbitURL);

  document.getElementById("temp").textContent = `${inFoTripData.temp}°C`;

  document.getElementById(
    "relativeHumidity"
  ).textContent = `Relative humidity: ${inFoTripData.relativeHumidity} %`;

  document.getElementById(
    "windSpeed"
  ).textContent = `Wind speed: ${inFoTripData.windSpeed} m/s`;

  document.getElementById(
    "description"
  ).textContent = `description: ${inFoTripData.description}`;
}

export { handleSubmit, currentTrip };
