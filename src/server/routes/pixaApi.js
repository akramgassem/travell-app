const express = require('express');
const router = express.Router();
// env Config
require('dotenv').config();
const sendRequest = require('../request');

router.route('/pixa').post((req, res) => {
  const { query, categorie } = req.body;
  const q = query.length !== undefined ? query : ['places'];
  const API_KEY = process.env.PIXA_KEY;
  const URL =
    'https://pixabay.com/api/?key=' +
    API_KEY +
    '&q=' +
    encodeURIComponent(q.join('+')) +
    `&categorie=${categorie}` +
    `&page=${3}` +
    '&image_type=photo' +
    '&min_height=480' +
    '&orientation=horizontal' +
    '&per_page=6';
  sendRequest(URL, res);
});

module.exports = router;
