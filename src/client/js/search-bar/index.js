/* eslint-disable no-undef */
import ApiService from '../services/apiService';
import Utilties from '../utils';
import card from '../result-card';

export default class SearchBar {
  constructor(header) {
    this.header = header;
    this.form = null;
    this.help = null;
    this._formHandler = this._formHandler.bind(this);
    this._handleInput = this._handleInput.bind(this);
    this._handleKeyInput = this._handleKeyInput.bind(this);
    this._clickOut = this._clickOut.bind(this);
    this.countries = null;
    this.geoList = null;
    this._selectUi();

    // autocomplete values
    this.currentFocus = null;
    this.idList = Utilties.ID();
    this._place = null;
    this.choice = false;
    this._handleLoading(false);
  }

  static init(header) {
    return new SearchBar(header);
  }

  async _selectUi() {
    this.form = document.querySelector('#searchBarForm');
    this.form.addEventListener('submit', this._formHandler, false);
    this.form.addEventListener('input', this._handleInput);
    this.form.addEventListener('keydown', this._handleKeyInput);
    this.help = document.querySelector('#place-help');
    document.addEventListener('click', this._clickOut);
    this.countries = await this._getCountries();
  }

  async _getCountries() {
    const countries = await ApiService.getCountries();
    return countries;
  }

  _formHandler(ev) {
    ev.preventDefault();
    this._submitValue(ev);
  }

  _handleInput() {
    const inputValue = this.form.placeInput.value;
    if (inputValue.length === 0) {
      this.choice = false;
    }
    if (!inputValue || inputValue.length < 4 || this.choice) {
      return false;
    }
    this.currentFocus = -1;
    this._handleLoading(true);
    this._getGeoCountries(inputValue).then((rr) => {
      this._handleLoading(false);
      this._closeAllLists();
      if (rr.geonames.length > 0) {
        this.geoList = rr;
        const formContainer = this.form.querySelector('.form-container');
        formContainer.appendChild(this._createCountriesList(inputValue));
      }
    });
  }

  _handleLoading(loading) {
    const loadingElm = document.querySelector('.loading');
    if (loading) {
      loadingElm.classList.add('show');
    } else {
      loadingElm.classList.remove('show');
    }
  }

  async _getGeoCountries(value) {
    return await ApiService.getGeoNamesByQuery({
      query: value.replace(' ', ''),
    });
  }

  _handleKeyInput(ev) {
    let currentList = document.getElementById(
      this.idList + '_autocomplete-list'
    );
    if (ev.keyCode === 27) {
      this._closeAllLists();
    }
    if (currentList)
      currentList = currentList.querySelectorAll('.coutrie-container');
    if (ev.keyCode === 40) {
      this.currentFocus++;
      this._addActive(currentList);
    } else if (ev.keyCode === 38) {
      this.currentFocus--;
      this._addActive(currentList);
    } else if (ev.keyCode === 13) {
      ev.preventDefault();
      if (this.currentFocus > -1) {
        if (currentList) currentList[this.currentFocus].click();
        this._submitValue(ev);
      } else {
        this._submitValue(ev);
      }
    }
  }

  _addActive(item) {
    if (!item) return false;
    [...item].forEach((el) => {
      el.classList.remove('autocomplete-active');
    });
    if (this.currentFocus >= item.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = item.length - 1;
    item[this.currentFocus].classList.add('autocomplete-active');
  }

  _closeAllLists(elmnt) {
    const items = document.getElementsByClassName('autocomplete-items');
    [...items].forEach((item) => {
      if (elmnt !== item && elmnt !== this.form.placeInput) {
        item.parentNode.removeChild(item);
      }
    });
  }

  _clickOut(ev) {
    this._closeAllLists(ev.target);
  }

  _createCountriesList(inputValue) {
    const list = document.createElement('DIV');
    list.setAttribute('id', this.idList + '_autocomplete-list');
    list.setAttribute('class', 'autocomplete-items');

    if (this.geoList.geonames.length === 0) return;

    this.geoList.geonames.forEach((item) => {
      const matchContryName = item.countryName
        ? item.countryName.substr(0, inputValue.length).toUpperCase() ===
          inputValue.toUpperCase()
        : false;
      const matchAdminName = item.adminName1
        ? item.adminName1.substr(0, inputValue.length).toUpperCase() ===
          inputValue.toUpperCase()
        : false;

      const matchTopoName = item.toponymName
        ? item.toponymName.substr(0, inputValue.length).toUpperCase() ===
          inputValue.toUpperCase()
        : false;

      if (matchContryName || matchAdminName || matchTopoName) {
        const listItem = this._createCountriesListItem(
          item,
          matchContryName,
          matchAdminName,
          matchTopoName,
          inputValue
        );
        list.appendChild(listItem);
      }
    });

    return list;
  }

  _submitValue(ev) {
    if (this.form.placeInput.value === '') {
      this.form.placeInput.focus();
      ev.preventDefault();
      this.help.innerText = 'Oops! forgot to put a place?';
    } else if (this.form.timeInput.value === '') {
      this.form.timeInput.focus();
      ev.preventDefault();
      this.help.innerText = 'Oops! forgot to put a date?';
    } else {
      ev.preventDefault();
      this.header.refresh([this.form.placeInput.value]);

      card.createResultCard({
        position: this._place,
        time: this.form.timeInput.value,
        image: this.header.currentImageUrl,
      });
      this.form.placeInput.value = '';
      this.form.timeInput.value = '';
      this.help.innerText = '';
      this.choice = false;
    }
  }

  _createCountriesListItem(
    item,
    matchContryName,
    matchAdminName,
    matchTopoName,
    inputValue
  ) {
    const listItem = document.createElement('div');
    listItem.classList.add('coutrie-container');

    const nameLetterMatch = item.countryName.substr(0, inputValue.length);
    const subName = item.countryName.substr(inputValue.length);
    const capitalLetterMatch = item.adminName1.substr(0, inputValue.length);
    const subCapital = item.adminName1.substr(inputValue.length);
    const topoLetterMatch = item.toponymName.substr(0, inputValue.length);
    const subTopo = item.toponymName.substr(inputValue.length);

    const countrie = this.countries.filter((countrie) =>
      countrie.alpha2Code.match(item.countryCode)
    )[0];

    listItem.innerHTML = `
    
    <div class="countrie-name">
        <div class="flag">
            <img src="${countrie.flag}" alt="${item.countryName}">
        </div>

        <p class="countrie-fields">
          <span class="${
            matchContryName ? 'focus' : ''
          }">${nameLetterMatch}</span><span>${subName}</span>,
          <span class="${
            matchAdminName ? 'focus' : ''
          }">${capitalLetterMatch}</span><span>${subCapital}</span></span>
          <span class="${
            matchTopoName ? 'focus' : ''
          }">${topoLetterMatch}</span><span>${subTopo}</span></span>
        </p>
      </div>
    `;

    listItem.innerHTML += `<input type='hidden' value="${item.toponymName}, ${item.countryName}">`;

    listItem.addEventListener('click', (ev) => {
      this.form.placeInput.value = listItem.getElementsByTagName(
        'input'
      )[0].value;
      this.choice = true;
      this._place = item;
      this._closeAllLists();
    });
    return listItem;
  }

  _formatter(str) {
    return str.replace(' ', '').toUpperCase();
  }
}
