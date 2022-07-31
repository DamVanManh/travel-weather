async function handleSubmit(event) {
  event.preventDefault();
  const location = document.getElementById("location").value;
  const dateArrival = document.getElementById("date").value;

  if (Client.isFormInvalid()) {
    return;
  }

  const inFoTripData = await Client.getInFoTrip(
    "http://localhost:8081/infotrip",
    { location, dateArrival }
  );

  console.log("NODE data ", inFoTripData);

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

  // if (sentimentRes.status.msg !== "OK") {
  //   content = `<h4>Error: ${sentimentRes.status.msg}</h4>`;
  // } else {
  //   content =
  //     `<h3>subjectivity: ${sentimentRes.subjectivity}</h3>` +
  //     sentimentRes.sentence_list
  //       .map((s) => {
  //         return `<div class="sentence">
  //     <p>Sentence: ${s.text}</p>
  //     <p>Agreement: ${s.agreement}</p>
  //     <p>Confidence: ${s.confidence}</p>
  //   </div>`;
  //       })
  //       .join("");
  // }

  // document.getElementById("results").innerHTML = content;
}

const testJest = {
  play() {
    return true;
  },
};

export { handleSubmit, testJest };
