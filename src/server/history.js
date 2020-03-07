/**
 *
 */
let data = [];

const getData = (req, res) => {
  const message = data.length === 0 ? 'no data yet!' : 'data served';
  res.send({
    data,
    message
  });
};

const postData = (req, res) => {
	if (req.body !== '') {
		const item = req.body;
    const result = [...new Set(data.push(item))];
		res.send({
			result,
			message: 'Item added with success!'
		});
	} else {
		res.send({
			data,
			message: 'no item found to add!'
		});
	}
};

const deleteDataItem = (req, res) => {

  if(req.body !== '') {
    const item = req.body;
    const result = data.filter(el => el.id !== item.id);
    res.send({
      result,
      message: 'Item deleted with success!'
    });
  } else {
     res.send({
				data,
				message: 'no item to delete!'
			});
  }
};

module.exports = {
  getData,
  postData,
  deleteDataItem,
  
};
