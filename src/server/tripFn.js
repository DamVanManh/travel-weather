const fs = require("fs");

const addTrip = (tripData) => {
  const trips = gettrips();
  const duplicateTrip = trips.find(
    (trip) =>
      trip.destination === tripData.destination &&
      trip.dateArrival === tripData.dateArrival
  );
  if (!duplicateTrip) {
    trips.push(tripData);
    saveTrips(trips);
  } else {
    console.log("duplicateTrip trip");
  }
};

const gettrips = () => {
  try {
    const dataBuffer = fs.readFileSync("trips.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeTrip = ({ destination, dateArrival }) => {
  const trips = gettrips();
  const tripsToKeep = trips.filter(
    (trip) =>
      trip.destination !== destination || trip.dateArrival !== dateArrival
  );

  if (trips.length > tripsToKeep.length) {
    saveTrips(tripsToKeep);
  } else {
    console.log("not found to remove");
  }
};

const saveTrips = (trips) => {
  const dataJSON = JSON.stringify(trips);
  fs.writeFileSync("trips.json", dataJSON);
};

module.exports = {
  addTrip,
  removeTrip,
  gettrips,
};
