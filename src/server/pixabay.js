// env Config
require("dotenv").config();
const request = require("request");

const getPIXA = (req, res) => {
  let query = req.body || "travel";
  const API_KEY = process.env.PIXA_KEY;
  const URL =
    "https://pixabay.com/api/?key=" +
    API_KEY +
    "&q=" +
    encodeURIComponent(query) +
    "&image_type=photo" +
    "&safesearch=true" +
    "&orientation=horizontal";
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

module.exports = {
  getPIXA
};
