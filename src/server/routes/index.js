const api = require('./api');
const countriesApi = require('./countriesApi');
const darkSkyApi = require('./darkSkyApi');
const geonamesApi = require('./geonamesApi');
const pixaApi = require('./pixaApi');
const historyApi = require('./historyApi');
const weatherBitApi = require('./weatherBitApi');

const routes = [
  api,
  countriesApi,
  darkSkyApi,
  geonamesApi,
  historyApi,
  pixaApi,
  weatherBitApi,
];

module.exports = routes;
