import ApiService from '../services/apiService';

export default class UserLocation {
  constructor() {
    this.element = null;
    this.showPosition = this.showPosition.bind(this);
    this.getLocation();
  }

  static get() {
    return new UserLocation();
  }

  getLocation() {
    this.element = document.getElementById('user-location');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.element.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }

  async showPosition(position) {
    this.element.setAttribute('data-lat', position.coords.latitude);
    this.element.setAttribute('data-lon', position.coords.longitude);

    // eslint-disable-next-line no-undef
    const data = await ApiService.getGeoNamesPosition({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });

    this._updateUi(data);
  }

  _updateUi(data) {
    this.element.innerText = `Actual position: ${data.geonames[0].name}, ${data.geonames[0].adminName1}, ${data.geonames[0].countryName}`;
    this.element.classList.remove('is-hidden');
  }
}
