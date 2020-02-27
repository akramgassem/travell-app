// env Config
require("dotenv").config();
const request = require("request");

const getPIXA = (req, res) => {
  console.log(req.body);
  
  let query = isEmpty(req.body) ? [] : req.body;
  let categorie = 'travel';
  const API_KEY = process.env.PIXA_KEY;
  const URL =
		'https://pixabay.com/api/?key=' +
		API_KEY +
		'&q=' +
		encodeURIComponent(query.join('+'));
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