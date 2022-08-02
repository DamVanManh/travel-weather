function renderTrips(trips) {
  let innerHtml = "";
  trips.forEach((trip) => {
    innerHtml += `
    <div class="current-trip" style="background: url(${trip.imgURL}) center/contain round">
    <div class="info">
      <div class="destination">
        <p>Destination</p>
        <p>${trip.destination}</p>
      </div>
      <div class="arrival-date">
        <p>Arrival date</p>
        <p>${trip.dateArrival}</p>
      </div>
    </div>
    <div class="weather-forecast">
      <div class="icon-weather">
        <img src="${trip.iconWeatherbitURL}" alt="icon weather">
      </div>
      <div class="temp">
        <p>${trip.temp}°C</p>
      </div>
      <div class="vertical">
        <p>${trip.relativeHumidity} %</p>
        <p>${trip.windSpeed} m/s</p>
        <p>${trip.description}</p>
      </div>
    </div>
    <div class="remove-btn">
      <button data-idtrip="${trip.destination}_${trip.dateArrival}" onclick="return Client.removeTripFN(event)">Remove trip</button>
    </div>
  </div>
    `;
  });
  document.getElementById("allTrips").innerHTML = innerHtml;
}

export { renderTrips };
