import '../styles/layout.scss';
import '../styles/base.scss';
import '../styles/header.scss';
import '../styles/main.scss';
import '../styles/form.scss';
import '../styles/footer.scss';
import imageBg from '../images/travel_app_bg.png';
import logoImg from '../images/travel_app_logo.png';
import {createElement, randomInt, logo, ID, convertSI} from './utils';
import { postData, getData, getCountries, getImagesByQuery, cachedImages, refreshImages, getGeoNames, weather } from './services/http-client';
import MessagePopUp from './services/message-pop-up';
import HeaderScreen from './header-screen';
import SearchBar from './search-bar';
import UserLoaction from './geo-location';
import SelectedPlaces from './selected-places';


import moment from '../../../node_modules/moment';

export {
    // Assets
    imageBg,
    logoImg,

    // Utils
    randomInt,
    createElement,
    logo,
    ID,
    convertSI,
    moment,

    // http calls & services
    MessagePopUp,
    postData,
    getData,
    getImagesByQuery,
    cachedImages,
    refreshImages,
    getCountries,
    getGeoNames,
    weather,
    
    // Classes UI and forms
    HeaderScreen,
    SearchBar,
    UserLoaction,
    SelectedPlaces
};


const handleLoad = async (ev)=> {
    // init logo
    logo();

    // Get user data from server
    const get = await APP.getData('/all/');
    
    // init header Bg and Form
    const header = HeaderScreen.init();
    SearchBar.init(header);
    
    //Request user geoposition 
    // const userPos = UserLocation.get();
   
};
document.addEventListener('DOMContentLoaded', handleLoad);