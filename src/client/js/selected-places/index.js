export default class SelectedPlaces {
  constructor(place) {
    this._place = place; // Array ['lat', 'lng']
    this.element = null;
    this.id = APP.ID();
    this._handleClick = this._handleClick.bind(this);
    this._createElement();
  }

  static init(value) {
    return new SelectedPlaces(value);
  }

  async _createElement() {
    this.element = document.createElement("div");
    ['colmun','is-three-quarters-mobile', 'is-two-thirds-tablet', 'is-half-desktop', 'is-one-third-widescreen', 'is-one-quarter-fullhd'].forEach(x => this.element.classList.add(x));
    const results = document.getElementById("results");
    results.append(this.element);
   

    const weather = await APP.weather({
      lat: this._place.latlng[0],
      lon: this._place.latlng[0]
    });

    const {
      apparentTemperature,
      cloudCover,
      dewPoint,
      humidity,
      icon,
      ozone,
      precipIntensity,
      precipProbability,
      precipType,
      pressure,
      summary,
      temperature,
      time,
      uvIndex,
      visibility,
      windBearing,
      windGust
    } = weather.currently;

    const weatherCurrent = `
    <div class="is-relative">
    <div class="is-absolute more-container">
    <a href="" class"button is-warning">
        More
    </a>
    </div>
    </div>
    <div class="weather-card" id="${this.id}">
    <p>
    <img src="${APP.weatherIcon(icon)}" alt="${icon} icon">
    </p>
    <p>
    <span class="prop">Feels like: </span>
    <span class="value"> ${APP.convertSI(apparentTemperature)} °C / ${apparentTemperature} °F</span>
    </p>
    <p>
    <span class="prop">Cloud Cover: </span>
    <span class="value">${cloudCover * 100} %</span>
    </p>
    <p>
    <span class="prop">Dew point: </span>
    <span class="value">${APP.convertSI(dewPoint)} °C / ${dewPoint} F°</span>
    </p>
    <p>
    <span class="prop">Humidity: </span>
    <span class="value">${humidity * 100} %</span>
    </p>
    <p>
    <span class="prop">Ozone: </span>
    <span class="value">${ozone} DU</span>
    </p>
    <p>
    <span class="prop">Preciptation intensity: </span>
    <span class="value">${precipIntensity *100} %</span>
    </p>
    <p>
    <span class="prop">Preciptation probability: </span>
    <span class="value">${precipProbability *100} %</span>
    </p>
    <p>
    <span class="prop">Preciptation probability: </span>
    <span class="value">${precipType === undefined ? '...' : precipType}</span>
    </p>
    <p>
    <span class="prop">Pressure: </span>
    <span class="value">${pressure} mBar</span>
    </p>
    <p>
    <span class="prop">Summary: </span>
    <span class="value">${summary}</span>
    </p>
    <p>
    <span class="prop">Temperature: </span>
    <span class="value"> ${APP.convertSI(temperature)} °C / ${temperature} °F</span>
    </p>
    <p>
    <span class="prop">Time: </span>
    <span class="value"> ${APP.moment(new Date(time *1000), "YYYYMMDD").fromNow()}</span>
    </p>
    <p>
    <span class="prop">UV Index: </span>
    <span class="value"> ${uvIndex}</span>
    </p>
    <p>
    <span class="prop">Visibility: </span>
    <span class="value"> ${visibility}</span>
    </p>
    <p>
    <span class="prop">Wind Bearing: </span>
    <span class="value"> ${windBearing}</span>
    </p>
    <p>
    <span class="prop">Wind Gust: </span>
    <span class="value"> ${windGust}</span>
    </p>
    </div>
    `;

    this.element.innerHTML = weatherCurrent;
    const button = this.element.querySelector('a');
    button.addEventListener('click', this._handleClick);
    //console.log(weather);
  }

  _handleClick(ev) {
        ev.preventDefault();
        const container = this.element.querySelector('#' + this.id);
        container.classList.toggle('collapse');
  }
}
