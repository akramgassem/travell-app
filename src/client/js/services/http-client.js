/* eslint-disable no-undef */
const BASEURL = 'http://localhost:8081/api/';
/**
 *
 * @param {String} endpoint URL API
 * @param {{}} data
 */
const post = async (endpoint, data) => {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${BASEURL}${endpoint}`, request);
  return await res.json();
};

/**
 *
 * @param {String} endpoint URL API
 * @param {{}} data
 */
const deleteItem = async (endpoint, data) => {
  const request = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${BASEURL}${endpoint}`, request);
  return await res.json();
};

/**
 *
 * @param {String} endpoint URL API
 * @param {{}} data
 */
const put = async (endpoint, data) => {
  const request = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${BASEURL}${endpoint}`, request);
  return await res.json();
};
/**
 *
 * @param {String} endpoint URL API
 */
const get = async (endpoint) => {
  const request = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch(`${BASEURL}${endpoint}`, request);
  return await res.json();
};

const cacheData = (name, res) => {
  if (res.message === 200) {
    const parsed =
      name === 'images' ? JSON.parse(res.data).hits : JSON.parse(res.data);
    if (parsed.length !== 0) {
      APP.MessagePopUp.show(`Get ${name} list.`, 'success');
      localStorage.setItem(name, JSON.stringify(parsed));
      return parsed;
    } else {
      APP.MessagePopUp.show(`C'ant get ${name} list!`, 'danger');
      const cache = localStorage.getItem(name);
      return JSON.parse(cache);
    }
  }
};

const getCountries = async () => {
  if (localStorage.getItem('countries') === null) {
    const countriesResponse = await get('countries');
    return cacheData('countries', countriesResponse);
  } else {
    const fromCache = localStorage.getItem('countries');
    return JSON.parse(fromCache);
  }
};

const getGeoNames = async ({ lat, lon }) => {
  const geoNames = await post('geonames', { lat, lon });
  return JSON.parse(geoNames.data);
};

const weather = async ({ lat, lon, time }) => {
  const weather = await post('weather', {
    lat,
    lon,
    time: time.format(),
  });
  if (weather.message.errno !== 'ENOTFOUND') {
    return JSON.parse(weather.data);
  }
};

const getImagesByQuery = async (query = ['paris']) => {
  const imagesResponse = await post('pixa', {
    query,
    categorie: 'places',
  });
  return cacheData('images', imagesResponse);
};

/**
 *
 * @param {string[]} query
 */
const cachedImages = async (query) => {
  if (localStorage.getItem('images') === null) {
    // no images on cache
    return await getImagesByQuery(query);
  } else {
    const cache = localStorage.getItem('images');
    return JSON.parse(cache);
  }
};

const addData = async (data) => {
  const add = await post('all', data);
  return add;
};

const deleteCardItem = async (data) => {
  const del = await deleteItem('all', data);
  APP.MessagePopUp.show(del.message, 'success');
  return del;
};

const updateCardItem = async (data) => {
  const update = await put('all', data);
  APP.MessagePopUp.show(update.message, 'success');
  return update;
};

module.exports = {
  getData: get,
  postData: post,
  addData,
  deleteCardItem,
  updateCardItem,
  getCountries,
  getImagesByQuery,
  cachedImages,
  getGeoNames,
  weather,
};
