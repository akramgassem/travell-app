const express = require('express');
const router = express.Router();
const history = require('./history.js');
const { getAll, geoNames, getPIXA, darkSky } = require('./api.js');

// app listen to params
router.post('/add/', history.postData);
router.post('/delete/', history.deleteDataItem);
router.post('/update/', history.updateDataItem);
router.get('/all/', history.getData);
router.post('/pixa/', getPIXA);
router.get('/countries/', getAll);
router.post('/geonames/', geoNames);
router.post('/weather/', darkSky);

module.exports = router;

/**
 * // env Config
require("dotenv").config();

// set aylien API credentias
const aylienapi = new aylien_API({
    application_id: process.env.APP_ID,
    application_key: process.env.API_KEY
  });
 */
