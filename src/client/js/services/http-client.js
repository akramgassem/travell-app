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

const cacheData = (name, res, succesMessage, errorMessage) => {
  if (res.message === 200) {
    const parsed = name === 'images' ?  JSON.parse(res.data).hits : JSON.parse(res.data);
    if (parsed.length !== 0) {
      APP.MessagePopUp.show(
        succesMessage,
        "success"
      );
      localStorage.setItem(name, JSON.stringify(parsed));
      return parsed;
    } else {
      APP.MessagePopUp.show(
        errorMessage,
        "danger"
      );
      const cache = localStorage.getItem(name);
      return JSON.parse(cache);
    }
  }
};

const getCountries = async () => {
  if (localStorage.getItem('countries') === null) {
  const countries = await getData('/countries/');
  const successMessage = `Get countries list!`;
  const errorMessage = `Can't get countries!`;
  return cacheData('countries', countries, successMessage,  errorMessage);
  } else {
    const fromCache = localStorage.getItem('countries');
    return JSON.parse(fromCache);
  }

};

const getGeoNames = async ({lat, lon}) => {
  const geoNames = await postData('/geonames/', {lat, lon});
  return JSON.parse(geoNames.data);
};


const weather = async ({lat, lon, time}) => {
  const weather = await postData('/weather/', {
		lat,
		lon,
		time: time.format()
	});
  return JSON.parse(weather.data);
};


const getImagesByQuery = async (query = ["paris"]) => {
  const imgs = await postData("/pixa/", {
    query,
    categorie: "places"
  });
  const successMessage = `Images from PixaBay :), Place: ${query}!`;
  const errorMessage = `No images for this Place: ${query}`;
  return cacheData('images', imgs, successMessage,  errorMessage);
};


/**
 * 
 * @param {string[]} query 
 */
const cachedImages = async (query) => {
  if (localStorage.getItem("images") === null) {
    // no images on cache
    return await getImagesByQuery(query);
  } else {
    const cache = localStorage.getItem("images");
    return JSON.parse(cache);
  }
};


const refreshImages = async (query) => {
  return await getImagesByQuery(query);
};

const addData = async (data) => {
  const post = await postData('/add/', data);
  return post;
};

module.exports = {
    getData,
    postData,
    addData,
    getCountries,
    getImagesByQuery,
    cachedImages,
    refreshImages,
    getGeoNames,
    weather
};