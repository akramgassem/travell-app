const express = require('express');
const router = express.Router();
// env Config
require('dotenv').config();
const sendRequest = require('../utils');

router.route('/geonames').get((req, res) => {
  const { q: query } = req.query;
  console.log(query);

  const GEOURL = `http://api.geonames.org/searchJSON?name_startsWith=${query}&username=${process.env.GEONAME_USERNAME}`;
  sendRequest(GEOURL, res);
});

module.exports = router;
