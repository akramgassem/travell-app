const express = require('express');
const router = express.Router();
// env Config
require('dotenv').config();
const sendRequest = require('../utils');

router.route('/countries').get((req, res) => {
  const URL = 'https://restcountries.eu/rest/v2/all';
  sendRequest(URL, res);
});

module.exports = router;
