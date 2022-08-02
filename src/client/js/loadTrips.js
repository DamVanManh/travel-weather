async function loadTrips() {
  const allTrips = await Client.getTrips();
  Client.renderTrips(allTrips);
}
export { loadTrips };
