const createElement = (classname = "", id = "", innerHTML = "") => {
  const el = document.createElement("div");
  el.setAttribute("id", id);
  el.classList.add(classname);
  el.innerHTML = innerHTML;
  return el;
};

const randomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const logo = () => {
  const logos = document.querySelectorAll(".logo");
  [...logos].forEach(el => el.src = APP.logoImg);
};


const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

/**
 * 
 * @param {number} C SI Units - Temperature
 * @returns C and F units
 */
const convertSI = (F) => {
  return  Math.floor((F - 32) * 5/9 );
};

const weatherIcon = (str) => {
  const icons = {
    'clear-day': APP.clearDay,
    'clear-night': APP.clearNight,
    'cloudy': APP.cloudy,
    'fog': APP.fog,
    'partly-cloudy-day': APP.partlyCloudyDay,
    'partly-cloudy-night': APP.partlyCloudyNight,
    'rain': APP.rain,
    'sleet': APP.sleet,
    'snow': APP.snow,
    'wind': APP.wind
  };
  return icons[str];
};



module.exports = {
  createElement,
  randomInt,
  logo,
  ID,
  convertSI,
  setTimeout,
  weatherIcon
};
