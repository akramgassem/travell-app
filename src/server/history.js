/**
 *
 */
let data = [];
const serverData = (item = "") => {
  data.push(item);
  return [...new Set(data)];
};

const getData = (req, res) => {
  const message = data.length === 0 ? 'no data yet!' : 'data served';
  res.send({
    data,
    message
  });
};

module.exports = {
  serverData,
  getData
};
