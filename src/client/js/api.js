import axios from "axios";

async function getInFoTrip(data = { location: "", date: "" }) {
  try {
    const infoData = await axios({
      method: "post",
      url: "http://localhost:8081/infotrip",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    return infoData.data;
  } catch (error) {
    return error;
  }
}

async function saveTrip(trip) {
  try {
    const allTrips = await axios({
      method: "post",
      url: "http://localhost:8081/saveTrip",
      headers: {
        "Content-Type": "application/json",
      },
      data: trip,
    });
    return allTrips.data;
  } catch (error) {
    throw Error(error);
  }
}

async function removeTrip({ destination, dateArrival }) {
  try {
    const allTrips = await axios({
      method: "post",
      url: "http://localhost:8081/removeTrip",
      headers: {
        "Content-Type": "application/json",
      },
      data: { destination, dateArrival },
    });
    return allTrips.data;
  } catch (error) {
    throw Error(error);
  }
}

async function getTrips() {
  try {
    const allTrips = await axios({
      method: "get",
      url: "http://localhost:8081/gettrips",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return allTrips.data;
  } catch (error) {
    throw Error(error);
  }
}

async function getGeonamesData(q) {
  try {
    const geonamesData = await axios({
      method: "post",
      url: "http://localhost:8081/getgeonamesdata",
      headers: {
        "Content-Type": "application/json",
      },
      data: { q },
    });
    return geonamesData.data;
  } catch (error) {
    throw Error(error);
  }
}
export { getInFoTrip, saveTrip, removeTrip, getTrips, getGeonamesData };
