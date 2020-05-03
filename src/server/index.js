// Express js
const express = require('express');
const app = express();
const api = require('./routes/api');
const historyApi = require('./routes/historyApi');
const geonamesApi = require('./routes/geonamesApi');
const pixaApi = require('./routes/pixaApi');
const countriesApi = require('./routes/countriesApi');
const darkSkyApi = require('./routes/darkSkyApi');
const weatherBitApi = require('./routes/weatherBitApi');

// Middleware
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.static('dist'));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Cors for cross origin allowance
app.use(cors());

// listen to for incoming requests
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server app listening on port http://localhost:${PORT}`);
});

// app use api
app.use('/api', [
  api,
  historyApi,
  geonamesApi,
  countriesApi,
  darkSkyApi,
  pixaApi,
  weatherBitApi,
]);

// default uri
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});
