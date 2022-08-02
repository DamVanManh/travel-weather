import {
  getInFoTrip,
  saveTrip,
  removeTrip,
  getTrips,
  getGeonamesData,
} from "./js/api";
import { handleSubmit, currentTrip } from "./js/formHandler";
import { isFormInvalid, setMinDate, setMaxDate } from "./js/validate";
import { saveTripFn } from "./js/saveTrip";
import { renderTrips } from "./js/renderTrips";
import { loadTrips } from "./js/loadTrips";
import { removeTripFN } from "./js/removeTrip";
import { autocomplete, timeOut } from "./js/autocomplete";

import "./styles/resets.scss";
import "./styles/main.scss";
import "./styles/base.scss";
import "./styles/form.scss";
import "./styles/header.scss";
import "./styles/footer.scss";
import "./styles/horsey.scss";

export {
  getInFoTrip,
  saveTrip,
  removeTrip,
  getTrips,
  getGeonamesData,
  saveTripFn,
  removeTripFN,
  handleSubmit,
  isFormInvalid,
  setMinDate,
  setMaxDate,
  currentTrip,
  renderTrips,
  loadTrips,
  autocomplete,
  timeOut,
};
