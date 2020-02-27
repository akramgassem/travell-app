const express = require('express');
const router = express.Router();
const history = require('./history.js');
const pixa = require('./pixabay.js');

// app listen to params 
router.get('/all/', history.getData);
router.post('/pixa/', pixa.getPIXA);

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