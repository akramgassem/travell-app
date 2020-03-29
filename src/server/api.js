// env Config
require('dotenv').config();
const sendRequest = require('./utils');

const getAll = (req, res) => {
  const URL = 'https://restcountries.eu/rest/v2/all';
  sendRequest(URL, res);
};

const geoNames = (req, res) => {
  const { lat, lon } = req.body !== {} ? req.body : { lat: '47.3', lon: '9' };
  const GEOURL = `http://api.geonames.org/findNearbyJSON?lat=${lat}&lng=${lon}&username=akramgassem`;
  sendRequest(GEOURL, res);
};

const darkSky = (req, res) => {
  const { lat, lon, time } =
    req.body !== {}
      ? req.body
      : { lat: '47.3', lon: '9', time: '2020-03-06T17:19:43+01:00' };
  const SKYURL = `https://api.darksky.net/forecast/${process.env.SKY_KEY}/${lat},${lon},${time}?units=si`;
  sendRequest(SKYURL, res);
};

const getPIXA = (req, res) => {
  const { query, categorie } = req.body;
  const q = query.length !== undefined ? query : ['places'];
  const API_KEY = process.env.PIXA_KEY;
  const URL =
    'https://pixabay.com/api/?key=' +
    API_KEY +
    '&q=' +
    encodeURIComponent(q.join('+')) +
    `&categorie=${categorie}` +
    `&page=${3}` +
    '&image_type=photo' +
    '&min_height=480' +
    '&orientation=horizontal' +
    '&per_page=6';
  sendRequest(URL, res);
};

module.exports = {
  getAll,
  geoNames,
  getPIXA,
  darkSky,
};
