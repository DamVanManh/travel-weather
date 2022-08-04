/**
 * @description This variable saves data of currentTrip, we need to export this to use in saveTrip function
 */
let currentTrip = null;

/**
 * @description Get infomation of destination and update UI
 * @param {event} event - event of button
 */
async function handleGetInfomation(event) {
  if (event) {
    event.preventDefault();
  }
  // check validation
  if (Client.isFormInvalid()) {
    return;
  }

  Client.showLoading(true);

  const dateArrival = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const inFoTripData = await Client.getInFoTrip({ location, dateArrival });

  Client.showLoading(false);

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

function handlePressEnter() {
  const input = document.getElementById("location");
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("submit").click();
    }
  });
}

export { handlePressEnter, handleGetInfomation, currentTrip };
