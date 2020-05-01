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

  // Request user geoposition
  // const userPos = UserLocation.get();
};
document.addEventListener('DOMContentLoaded', handleLoad);
