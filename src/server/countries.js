// env Config
require("dotenv").config();
const request = require("request");

const getAll = (req, res) => {
  const URL = "https://restcountries.eu/rest/v2/all";
  request(URL, (error, response, body) => {
    if (error === null) {
      res.send({
        message: response.statusCode,
        data: body
      });
    } else {
      res.send({
        message: error,
        data: body
      });
    }
  });
};



const geoNames = (req, res) => {
  const { lat, lon } = req.body !== {} ? req.body : {lat: '47.3', lon: '9' };
  const GEOURL = `http://api.geonames.org/findNearbyJSON?lat=${lat}&lng=${lon}&username=akramgassem`;
  request(GEOURL, (error, response, body) => {
    if (error === null) {
      res.send({
        message: response.statusCode,
        data: body
      });
    } else {
      res.send({
        message: error,
        data: body
      });
    }
  });
};


const darkSky = (req, res) => {
  const { lat, lon } = req.body !== {} ? req.body : {lat: '47.3', lon: '9' };
  const GEOURL = `https://api.darksky.net/forecast/${process.env.SKY_KEY}/${lat},${lon}`;
  request(GEOURL, (error, response, body) => {
    if (error === null) {
      res.send({
        message: response.statusCode,
        data: body
      });
    } else {
      res.send({
        message: error,
        data: body
      });
    }
  });
};

module.exports = {
  getAll,
  geoNames,
  darkSky
};
