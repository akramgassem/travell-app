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
  const logo = document.querySelector("#logo");
  logo.src = APP.logoImg;
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
 * @param {number} K SI Units - Temperature
 * @returns C and F units
 */
const convertSI = (F) => {
  return  Math.floor((F - 32) * 5/9 );
};





module.exports = {
  createElement,
  randomInt,
  logo,
  ID,
  convertSI,
  setTimeout
};
