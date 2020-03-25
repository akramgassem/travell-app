const express = require('express');
const router = express.Router();
const history = require('./history.js');
const pixa = require('./pixabay.js');
const countries = require('./countries.js');

// app listen to params
router.post('/add/', history.postData);
router.post('/delete/', history.deleteDataItem);
router.post('/update/', history.updateDataItem);
router.get('/all/', history.getData);
router.post('/pixa/', pixa.getPIXA);
router.get('/countries/', countries.getAll);
router.post('/geonames/', countries.geoNames);
router.post('/weather/', countries.darkSky);

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
