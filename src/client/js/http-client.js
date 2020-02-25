const BASEURL = "http://localhost:8081/api";

const postData = (endpoint, data) => {
  const request = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch(`${BASEURL}${endpoint}`, request)
    .then(res => res.json());
    
};

const getData = (endpoint) => {
  const request = {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
    }
  };
  return fetch(`${BASEURL}${endpoint}`, request)
    .then(res => res.json());
    
};


module.exports = {
    getData,
    postData
};