const express = require('express');
const router = express.Router();
// env Config
require('dotenv').config();
const sendRequest = require('../request');

function url(req, res) {
  const { city, state, country } = req.query;
  let GEOURL;
  if (country !== undefined) {
    GEOURL = `https://api.weatherbit.io/v2.0/current?city=${city},${state}&country=${country}&key=${process.env.WEATHERBIT_KEY}`;
  } else {
    GEOURL = `https://api.weatherbit.io/v2.0/current?city=${city},${state}&key=${process.env.WEATHERBIT_KEY}`;
  }
  sendRequest(GEOURL, res);
}

router.route('/weatherbit/current').post((req, res) => {
  url(req, res);
});

router.route('/weatherbit/forecast').post((req, res) => {
  url(req, res);
});
module.exports = router;
