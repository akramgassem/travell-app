import '../styles/main.scss';
import assets from '../images';

import Utilities from './utils';
import ApiService from './services/apiService';
import MessagePopUp from './services/message-pop-up';
import card from './result-card';
import HeaderScreen from './header-screen';
import SearchBar from './search-bar';
import UserLoaction from './geo-location';

import moment from 'moment';

import Breakpoints from 'breakpoints-js';

export {
  // Assets weather icons
  assets,
  // Utils
  Utilities,
  // http calls & services
  MessagePopUp,
  ApiService,
  moment,
  // Classes UI and forms
  HeaderScreen,
  SearchBar,
  UserLoaction,
  card,
  Breakpoints,
};

const handleLoad = async (ev) => {
  // init logo
  Utilities.logo();

  // Get user data from server
  const get = await ApiService.get('all');
  get.data.forEach((element) => {
    card.createWeatherCard(element);
  });

  // init header Bg and Form
  const header = HeaderScreen.init();
  SearchBar.init(header);

  const field = document.querySelector('.field');
  Breakpoints();
  Breakpoints.current();

  Breakpoints.on('xs', {
    enter: function () {
      field.classList.remove('has-addons');
    },
  });

  Breakpoints.on('sm', {
    enter: function () {
      field.classList.add('has-addons');
    },
  });

  // Request user geoposition
  // const userPos = UserLocation.get();
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

document.addEventListener('DOMContentLoaded', handleLoad);
