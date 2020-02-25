import { postData, getData } from './js/http-client';

import './styles/layout.scss';
import './styles/header.scss';
import './styles/form.scss';
import './styles/footer.scss';


export {
    postData,
    getData
};


const handleLoad = async (ev)=> {
    const data = await Client.getData('/all/');
    console.log(data.message);
    const message = document.querySelector('#message');
    message.innerText =  data.message;
};
  
  document.addEventListener('DOMContentLoaded', handleLoad);