async function saveTripFn(event) {
  event.preventDefault();
  if (Client.currentTrip === null) {
    return;
  }

  const allTrips = await Client.saveTrip(Client.currentTrip);

  Client.renderTrips(allTrips);
}

export { saveTripFn };
