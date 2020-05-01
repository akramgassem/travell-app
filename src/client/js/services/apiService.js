/* eslint-disable no-undef */
import MessagePopUp from './message-pop-up';

const BASEURL = 'http://localhost:8081/api/';

const ApiService = {
  /**
   *
   * @param {String} endpoint URL API
   * @param {{}} data
   */
  post: async (endpoint, data) => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`${BASEURL}${endpoint}`, request);
    return await res.json();
  },

  /**
   *
   * @param {String} endpoint URL API
   * @param {{}} data
   */
  deleteItem: async (endpoint, data) => {
    const request = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`${BASEURL}${endpoint}`, request);
    return await res.json();
  },

  /**
   *
   * @param {String} endpoint URL API
   * @param {{}} data
   */
  put: async (endpoint, data) => {
    const request = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`${BASEURL}${endpoint}`, request);
    return await res.json();
  },
  /**
   *
   * @param {String} endpoint URL API
   */
  get: async (endpoint) => {
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(`${BASEURL}${endpoint}`, request);
    return await res.json();
  },

  addData: async (data) => {
    const add = await ApiService.post('all', data);
    return add;
  },

  deleteCardItem: async (data) => {
    const del = await ApiService.deleteItem('all', data);
    MessagePopUp.show(del.message, 'success');
    return del;
  },

  updateCardItem: async (data) => {
    const update = await ApiService.put('all', data);
    MessagePopUp.show(update.message, 'success');
    return update;
  },
  cacheData: (name, res) => {
    if (res.message === 200) {
      const parsed =
        name === 'images' ? JSON.parse(res.data).hits : JSON.parse(res.data);
      if (parsed.length !== 0) {
        MessagePopUp.show(`Get ${name} list.`, 'success');
        localStorage.setItem(name, JSON.stringify(parsed));
        return parsed;
      } else {
        MessagePopUp.show(`C'ant get ${name} list!`, 'danger');
        const cache = localStorage.getItem(name);
        return JSON.parse(cache);
      }
    }
  },

  /**
   *
   * @param {string[]} query
   */
  cachedImages: async (query) => {
    if (localStorage.getItem('images') === null) {
      // no images on cache
      return await ApiService.getImagesByQuery(query);
    } else {
      const cache = localStorage.getItem('images');
      return JSON.parse(cache);
    }
  },
  getCountries: async () => {
    if (localStorage.getItem('countries') === null) {
      const countriesResponse = await get('countries');
      return ApiService.cacheData('countries', countriesResponse);
    } else {
      const fromCache = localStorage.getItem('countries');
      return JSON.parse(fromCache);
    }
  },
  getGeoNames: async ({ lat, lon }) => {
    const geoNames = await ApiService.post('geonames', { lat, lon });
    return JSON.parse(geoNames.data);
  },
  weather: async ({ lat, lon, time }) => {
    const weather = await ApiService.post('weather', {
      lat,
      lon,
      time: time.format(),
    });
    if (weather.message.errno !== 'ENOTFOUND') {
      return JSON.parse(weather.data);
    }
  },

  getImagesByQuery: async (query = ['paris']) => {
    const imagesResponse = await ApiService.post('pixa', {
      query,
      categorie: 'places',
    });
    return ApiService.cacheData('images', imagesResponse);
  },
};

export default ApiService;
