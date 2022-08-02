async function removeTripFN(event) {
  event.preventDefault();
  const [destination, dateArrival] = event.srcElement.dataset.idtrip.split("_");
  const allTrips = await Client.removeTrip({ destination, dateArrival });
  Client.renderTrips(allTrips);
}

export { removeTripFN };
