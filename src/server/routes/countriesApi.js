const express = require('express');
const router = express.Router();
// env Config
require('dotenv').config();
const request = require('../request');

router.route('/countries').get((req, res) => {
  const URL = 'https://restcountries.eu/rest/v2/all';
  request(URL, res);
});

module.exports = router;
