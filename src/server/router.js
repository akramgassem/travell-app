const express = require('express');
const router = express.Router();
const history = require('./history.js');

// app listen to params 
router.get('/all/', history.getData);

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