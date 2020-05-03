// Express js
const express = require('express');
const app = express();
const routes = require('./routes');

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

// app use api
app.use('/api', routes);

module.exports = app;
