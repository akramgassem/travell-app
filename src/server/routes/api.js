const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send({ message: 'api works' });
  res.sendStatus(200);
});

module.exports = router;
