// Express js
const express = require('express');
const app = express();
  
// Middleware
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.static('dist'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());


// listen to for incoming requests
const PORT = 8081;
app.listen(PORT,  () => {
  console.log(`Server app listening on port http://localhost:${PORT}`);
});


const router = require('./router.js');

// app use api aylien
app.use('/api/', router);


// default uri
app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
});

