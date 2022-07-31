import axios from "axios";
async function getInFoTrip(path = "", data = { location: "", date: "" }) {
  try {
    const infoData = await axios({
      method: "post",
      url: path,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    return infoData.data;
  } catch (error) {
    throw Error(error);
  }
}

export { getInFoTrip };
