const express = require('express');
const router = express.Router();
let data = [];

router
  .route('/all')
  .post((req, res) => {
    if (req.body !== '') {
      const item = req.body;
      data.push(item);
      const result = [...new Set(data)];
      res.send({
        result,
        message: 'Item added with success!',
      });
    } else {
      res.send({
        data,
        message: 'no item found to add!',
      });
    }
  })
  .get((req, res) => {
    const message = data.length === 0 ? 'no data yet!' : 'data served';
    res.send({
      data,
      message,
    });
  })
  .put((req, res) => {
    if (req.body !== '') {
      const items = req.body;
      let result = [];
      items.forEach((item) => {
        result = data.filter((el) => el.id !== item.id);
        data = result;
        data.push(item);
      });
      data = result;

      res.send({
        data,
        message: 'Item Updated with success!',
      });
    } else {
      res.send({
        data,
        message: 'no item to delete!',
      });
    }
  })
  .delete((req, res) => {
    if (req.body !== '') {
      const item = req.body;
      const result = data.filter((el) => el.id !== item.id);
      data = result;
      res.send({
        data,
        message: 'Item deleted with success!',
      });
    } else {
      res.send({
        data,
        message: 'no item to delete!',
      });
    }
  });

module.exports = router;
