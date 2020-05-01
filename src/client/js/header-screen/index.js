/* eslint-disable no-undef */
import ApiService from '../services/apiService';
import Utilities from '../utils';
import MessagePopUp from '../services/message-pop-up';

export default class HeaderScreen {
  constructor(query) {
    this.images = null;
    this.element = null;
    this.tags = null;
    this.link = null;
    this.user = null;
    this.views = null;
    this._handleReload = this._handleReload.bind(this);
    this.timer = null;
    this.query = query;
    this.currentImageUrl = null;
    // this.formSubmitted = false;

    this._init();
  }

  async _init() {
    this.element = document.querySelector('.pixa-image-container');
    this.element.addEventListener('click', this._handleReload);

    this.tags = document.querySelector('#tags');
    this.link = document.querySelector('#link');
    this.user = document.querySelector('#user');
    this.views = document.querySelector('#views');

    this.images = await ApiService.cachedImages(this.query);
    this._populateUi();
  }

  static init(query) {
    return new HeaderScreen(query);
  }

  async refresh(query) {
    this.images = await ApiService.getImagesByQuery(query);
    this.currentImageUrl = this.images[
      Utilities.randomInt(this.images.length)
    ].largeImageURL;
    window.clearTimeout(this.timer);
    this._populateUi();
  }

  _populateUi() {
    if (this.images !== null) {
      this._updateFields(Utilities.randomInt(this.images.length));
      this.timer = setInterval(() => {
        this._updateFields(Utilities.randomInt(this.images.length));
      }, 50000);
    }
  }

  _updateFields(int) {
    const image = this.images[int];
    this.element.style.backgroundImage = `url(${image.largeImageURL})`;
    this.tags.innerText = image.tags;
    this.link.href = image.pageURL;
    this.user.innerText = image.user;
    this.views.innerText = image.views;

    MessagePopUp.show(image.tags, 'info');
  }

  _handleReload(ev) {
    if (ev.target.getAttribute('id') === 'reload') {
      localStorage.clear();
      window.clearTimeout(this.timer);
      this._populateUi();
    }
  }
}
