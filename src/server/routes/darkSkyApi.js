const express = require('express');
const router = express.Router();
// env Config
require('dotenv').config();
const sendRequest = require('../utils');

router.route('/weather').post((req, res) => {
  const { lat, lon, time } = req.body;
  const SKYURL = `https://api.darksky.net/forecast/${process.env.SKY_KEY}/${lat},${lon},${time}?units=si`;
  sendRequest(SKYURL, res);
});

module.exports = router;
