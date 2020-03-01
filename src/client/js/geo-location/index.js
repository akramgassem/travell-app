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
    this.element = document.getElementById("user-location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.element.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  async showPosition(position) {
    this.element.setAttribute("data-lat", position.coords.latitude);
    this.element.setAttribute("data-lon", position.coords.longitude);

    const data = await APP.getGeoNames({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });

    const Weather = await APP.weather({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });

    console.log(Weather);
    this._updateUi(data);
  }

  _updateUi(data) {
    const { name, adminName1, countryName } = data.geonames[0];

    this.element.innerText = `Actual position: ${name}, ${adminName1}, ${countryName}`;
    this.element.classList.remove('is-hidden');
  }
}
