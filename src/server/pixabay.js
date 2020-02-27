// env Config
require("dotenv").config();
const request = require("request");

const getPIXA = (req, res) => {
  console.log(req.body);

    const {query, categorie } = req.body;
  
  const API_KEY = process.env.PIXA_KEY;
  const URL =
		'https://pixabay.com/api/?key=' +
		API_KEY +
		'&q=' + encodeURIComponent(query.join('+')) +
    `&categorie=${categorie}` +
    `&page=${3}` +
    `&image_type=photo` +
    `&min_height=480` +
    `&orientation=horizontal` +
    '&per_page=100';
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


function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			return false;
		}
	}

	return JSON.stringify(obj) === JSON.stringify({});
}