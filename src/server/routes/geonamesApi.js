const express = require('express');
const router = express.Router();
// env Config
require('dotenv').config();
const sendRequest = require('../utils');

router.route('/geonames/query').post((req, res) => {
  const { query } = req.query;
  const GEOURL = `http://api.geonames.org/searchJSON?name_startsWith=${query}&username=${process.env.GEONAME_USERNAME}`;
  sendRequest(GEOURL, res);
});

router.route('/geonames/position').post((req, res) => {
  const { lat, lon } = req.query;
  const GEOURL = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&username=${process.env.GEONAME_USERNAME}`;
  sendRequest(GEOURL, res);
});

module.exports = router;
