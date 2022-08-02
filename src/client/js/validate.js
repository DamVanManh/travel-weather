function isFormInvalid(error) {
  if (error !== undefined) {
    document.getElementById(`system-error`).innerText = error;
    document.getElementById(`system-error`).classList.add("visible");
  } else {
    document.getElementById(`system-error`).classList.remove("visible");
  }

  const supportValidation = {
    location: {
      invalid: true,
    },
    date: {
      invalid: true,
    },
  };

  Object.keys(supportValidation).forEach((key) => {
    const text = document.getElementById(key).value;
    if (text.trim() === "") {
      document.getElementById(`${key}-required`).classList.add("visible");
      supportValidation[key].invalid = true;
    } else {
      document.getElementById(`${key}-required`).classList.remove("visible");
      supportValidation[key].invalid = false;
    }
  });

  if (supportValidation.location.invalid || supportValidation.date.invalid) {
    return true;
  } else return false;
}

function setMinDate() {
  const minDate = new Date().toISOString().slice(0, 10);
  document.getElementById("date").setAttribute("min", minDate);
}

function setMaxDate() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 15);
  const maxDate = currentDate.toISOString().slice(0, 10);
  document.getElementById("date").setAttribute("max", maxDate);
}

export { isFormInvalid, setMinDate, setMaxDate };
