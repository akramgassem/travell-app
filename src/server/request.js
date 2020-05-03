const request = require('request');

function sendRequest(URI, res) {
  request(URI, (error, response, body) => {
    if (error === null) {
      res.send({
        message: response.statusCode,
        data: body,
      });
    } else {
      res.send({
        message: error,
        data: body,
      });
    }
  });
}

module.exports = sendRequest;
