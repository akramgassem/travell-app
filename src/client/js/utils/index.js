/* eslint-disable no-undef */
import assets from '../../images';

const Utilties = {
  createElement: (classname = '', id = '', innerHTML = '') => {
    const el = document.createElement('div');
    el.setAttribute('id', id);
    el.classList.add(classname);
    el.innerHTML = innerHTML;
    return el;
  },

  randomInt: (max) => Math.floor(Math.random() * Math.floor(max)),

  logo: () => {
    const logos = document.querySelectorAll('.logo');
    [...logos].forEach((el) => {
      el.src = assets.logoImg;
    });
  },

  ID: () => '_' + Math.random().toString(36).substr(2, 9),

  /**
   *
   * @param {number} C SI Units - Temperature
   * @returns C and F units
   */
  convertSI: (F) => Math.floor(((F - 32) * 5) / 9),

  srollTo: (posTop) => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: posTop - 302,
        left: 0,
        behavior: 'smooth',
      });
      window.clearTimeout(timer);
    }, 300);
    return timer;
  },

  weatherIcon: (str) => {
    const icons = {
      'clear-day': assets.clearDay,
      'clear-night': assets.clearNight,
      cloudy: assets.cloudy,
      fog: assets.fog,
      'partly-cloudy-day': assets.partlyCloudyDay,
      'partly-cloudy-night': assets.partlyCloudyNight,
      rain: assets.rain,
      sleet: assets.sleet,
      snow: assets.snow,
      wind: assets.wind,
    };
    return icons[str];
  },
};

export default Utilties;
