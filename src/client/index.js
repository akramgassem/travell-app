import { postData, getData } from './js/http-client';
import { logoContainer } from './js/layout';
import './styles/layout.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/form.scss';
import './styles/footer.scss';

import imageBg from './images/travel_app_bg.png';
import logo from './images/travel_app_logo.png';


export {
    postData,
    getData,
    imageBg,
    logo,
    logoContainer
};


const handleLoad = async (ev)=> {
    logoContainer();
    const data = await APP.getData('/all/');
    console.log(data.message);
    const message = document.querySelector('#message');
    message.innerText =  data.message;
};
  
  document.addEventListener('DOMContentLoaded', handleLoad);