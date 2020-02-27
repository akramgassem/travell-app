import { postData, getData } from '../js/http-client';

import MessagePopUp from '../js/message-pop-up';

import '../styles/layout.scss';
import '../styles/base.scss';
import '../styles/header.scss';
import '../styles/main.scss';
import '../styles/form.scss';
import '../styles/footer.scss';

import imageBg from '../images/travel_app_bg.png';
import logo from '../images/travel_app_logo.png';
import PixaImages from '../js/pixa-images';
import SearchForm from '../js/search-form';


export {
    postData,
    getData,
    imageBg,
    logo,
    MessagePopUp,
    SearchForm
};


const handleLoad = async (ev)=> {
    const get = await APP.getData('/all/');
   
    new PixaImages(10);
    
    
    new MessagePopUp('Hello my friend!', 'success');
    if (get.data.length === 0) {
       new MessagePopUp(get.message, 'warning');
        
    }
};
  
document.addEventListener('DOMContentLoaded', handleLoad);