/* eslint-disable no-undef */
import ApiService from '../services/apiService';
import Utilties from '../utils';

let changes = [];
const handleChange = async (ev) => {
  const changeBtn = document.getElementById('changes');
  const cancelBtn = document.getElementById('cancel');
  if (ev.target.id === 'changes' && changes.length > 0) {
    ev.preventDefault();
    changeBtn.classList.add('is-loading');

    const upd = await APP.updateCardItem(changes);
    if (upd) {
      changeBtn.classList.remove('is-loading');
      changeBtn.disabled = true;
      cancelBtn.disabled = true;
      changes = [];
    }
  }

  if (ev.target.id === 'cancel') {
    ev.preventDefault();
  }
};

document.addEventListener('click', handleChange);

const updateChanges = (card) => {
  const changeBtn = document.getElementById('changes');
  const cancelBtn = document.getElementById('cancel');
  changeBtn.disabled = false;
  cancelBtn.disabled = false;
  changes.push(card);
};

const updateNumber = (card) => {
  const num = document.getElementById(`number${card.id}`);
  if (num) {
    const res = {};
    card.entries.forEach((el) => {
      if (!res[el.type]) {
        res[el.type] = 0;
      }
      ++res[el.type];
    });
    const types = Object.keys(res);
    num.innerText =
      types.length === 0
        ? 0
        : `${types.map((type) => {
            return `${type}: ${res[type]}`;
          })}`;
  }
  return card.entries.length;
};

/**
 *
 * @param {number} current weather current temp
 * @param {number} min temperature min
 * @param {number} max temperature max
 */
const weatherRange = (current, min, max) => {
  // range function
  const range = (start, end, step) => {
    if (start === end) return [start];
    return [start, ...range(start + step, end, step)];
  };

  const zero = 20;
  let minTemp = zero + min;
  let maxTemp = zero + max;
  if (minTemp % 2 !== 0) minTemp += 1;
  if (maxTemp % 2 !== 0) maxTemp += 1;

  const width = 100;
  const degrees = range(0, 70, 2);
  // -20 to 50 degree

  const wrapper = document.createElement('div');

  const container = document.createElement('div');
  container.classList.add('weather-range');
  container.style.cssText = `
  position: relative;
  width: ${width * 2}px;
  height: ${width}px;
  margin: auto;
  `;

  const currentLabel = document.createElement('div');
  currentLabel.innerText = `${current}°C`;
  currentLabel.style.cssText = `
  position: absolute;
  top: ${width - 32}px;
  left: calc((200px - 90px) / 2);
  width: 90px;
  color: rgb(237, 237, 237);
  height: auto;
  font-size: 32px;
  text-align: center;
  `;

  container.append(currentLabel);

  degrees.forEach((degree) => {
    const rot = Math.ceil((185 / degrees.length) * (degree / 2));
    const colorSpec = degree * 2 + 240;

    const deg = document.createElement('div');
    deg.style.cssText = `
    position: absolute;
    top: ${width}px;
    height: auto;
    width: ${width * 2}px;
    left: 0;
    transform: rotate(${rot}deg);
    `;

    const line = document.createElement('div');
    line.style.cssText = `
    height: 2px;
    border-radius: 3px;
    width: ${rot % 180 === 0 ? 40 : 20}px;
    background-color: hsl(${colorSpec}, 80%, 80%);
    `;

    const dot = document.createElement('div');
    dot.style.cssText = `
    position: absolute;
    left: 24px;
    top: -1px;
    height: 4px;
    width: 4px;
    border-radius: 5px;
    background-color: hsl(${colorSpec}, 80%, 60%);
    `;

    const labelContainer = document.createElement('div');
    labelContainer.style.cssText = `
    position: relative;
    border-radius: 10px;
    height: auto;
    background-color: #eee;
    left: 30px;
    top: ${
      Math.abs(maxTemp - minTemp) <= 6 && minTemp === degree ? '5px' : '-7px'
    };
    `;

    const label = document.createElement('div');
    label.innerText = `${min}°`;
    label.style.cssText = `
    position: absolute;
    font-weight: 300;
    font-size: 14px;
    line-height: 14px;
    transform: rotate(${-rot}deg);
    color: hsl(${colorSpec}, 50%, 50%);
    `;
    labelContainer.append(label);

    if (minTemp === degree) {
      deg.append(dot);
      deg.append(labelContainer);
    }
    if (maxTemp === degree) {
      deg.append(dot);
      label.innerText = `${max}°`;
      deg.append(labelContainer);
    }
    deg.append(line);
    container.append(deg);
  });

  wrapper.append(container);
  return wrapper.innerHTML;
};

const parseTime = (T) => {
  return APP.moment(new Date(T), 'YYYYMMDD');
};

const createEntryItem = (list, input = null) => {
  const entry =
    input === null
      ? list
      : {
          id: APP.ID(),
          type: list.type,
          value: input.value,
        };

  const itemList = document.createElement('li');
  itemList.setAttribute('id', entry.id);
  itemList.setAttribute('type', entry.type);
  itemList.innerHTML = `
    <span class="text">${entry.value}</span>
    <span class="delete" id="del_${entry.id}"></span>
  `;
  if (input === null) {
    return itemList;
  } else {
    const entries = document.getElementById(`${list.type}${list.id}`);
    entries.prepend(itemList);
    return entry;
  }
};

const card = {
  createWeatherCard: async (configs) => {
    const imagefromCache = await ApiService.cachedImages();
    const card = {
      id: configs.id,
      country: configs.country,
      image:
        configs.image !== null
          ? configs.image
          : imagefromCache[Utilties.randomInt(imagefromCache.length)]
              .largeImageURL,
      dailyWeather: configs.dailyWeather,
      time: configs.time,
      entries: configs.entries,
    };

    const lists = [
      {
        id: Utilties.ID(),
        type: 'packing',
        name: 'packing list',
        placeholder: 'First Pack!',
      },
      {
        id: Utilties.ID(),
        type: 'todo',
        name: 'add notes',
        placeholder: 'First Task!',
      },
      {
        id: Utilties.ID(),
        type: 'lodging',
        name: 'lodging Infos',
        placeholder: 'Visit this hotel!',
      },
    ];

    const markup = `
  <div class="card-result">
    <div class="card-result__header" style="background-image: url(${
      card.image
    })">
      <div class="card__overlay"></div>
      <div class="card-result__actions-bar">
        
        <div class="start">
          <div class="tags has-addons">
            <span id="number${card.id}" class="tag is-warning">${updateNumber(
      card
    )}</span>
          </div>
          <a id="expand_${
            card.id
          }" class="button is-rounded is-small has-text-warning is-text">
            <span id="expand_${card.id}">Expand</span>
            <span id="expand_${card.id}"class="icon is-small">
              <i class="fas fa-angle-down"></i>
            </span>
          </a>
        </div>

        <button id="remove${
          card.id
        }" class="delete is-rounded is-small is-black"></button>
      </div>
      
      <div class="card-result__weather-wrapper">
        ${(() => {
          if (card.dailyWeather !== null) {
            return `<div class="weather-info">
              ${(() => {
                const {
                  apparentTemperatureMin,
                  temperatureMin,
                  temperatureMax,
                } = card.dailyWeather;
                return weatherRange(
                  Math.floor(apparentTemperatureMin),
                  Math.floor(temperatureMin),
                  Math.floor(temperatureMax)
                );
              })()}
              <div class=" summary has-text-centered has-text-white">
                <p>
                  ${
                    card.dailyWeather.summary !== undefined
                      ? card.dailyWeather.summary
                      : ''
                  } 
                  ${APP.moment(
                    new Date(card.dailyWeather.time * 1000),
                    'YYYYMMDD'
                  ).fromNow()}, in ${card.country}
                </p>
              </div>
              </div>`;
          } else {
            return `<div class="weather-info">
<div class=" summary has-text-centered has-text-warning">
No data weather for ${card.country}, ${parseTime(card.time).fromNow()}! 
</div>
</div>`;
          }
        })()}
            </div>
        </div>

<div class="card-result__lists hided" data-expanded="false" id="card_${
      card.id
    }">
          ${lists
            .map((item) => {
              return `<div class="lists_item" id="${item.id}">
                  <p class="lists_title">${item.name}</p>
<ul class="entries" id="${item.type}${item.id}">
</ul>
                  <div class="lists_input">
                    <div class="field has-addons">
                      <div class="control">
                        <input id="input${item.id}"
                          class="input is-rounded is-small"
                          type="text"
                          value=""
                          autocomplete="off"
                          placeholder="${item.placeholder}"
                        />
                      </div>
                    <div class="control">
                      <button id="btn${item.id}" class="button is-rounded is-small is-warning">
                        <span id="btn${item.id}" class="icon has-text-dark is-medium ">
                          <i class="fas fa-lg fa-plus-square"></i>
                        </span>
                        <span id="btn${item.id}">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;
            })
            .join('')}
        </div>
      </div>
  `;

    // create element wrapper
    const element = document.createElement('div');
    element.setAttribute('id', card.id);
    element.classList.add('card-wrapper');
    element.innerHTML = markup;

    // append to his parent
    const parent = document.getElementById('results');
    parent.append(element);

    // create entries if entries exits
    lists.forEach((item) => {
      const ul = document.getElementById(`${item.type}${item.id}`);
      if (card.entries.length !== 0) {
        card.entries.map((entry) => {
          if (entry.type === item.type) {
            const li = createEntryItem(entry);
            ul.prepend(li);
          }
        });
        updateNumber(card);
      }
    });

    // select card by id
    const cardElement = document.getElementById(card.id);
    Utilties.srollTo(cardElement.offsetTop);

    const handleClick = (ev) => {
      // handle input and add btns
      if (/input_/.test(ev.target.id) || /btn_/.test(ev.target.id)) {
        const id = ev.target.id.replace('btn', '');
        const list = lists.filter((el) => el.id === id)[0];
        const input = document.getElementById(`input${id}`);

        // create entry object
        if (input !== null) {
          if (input.value !== '' && ev.target.id === `btn${id}`) {
            const entry = createEntryItem(list, input);
            card.entries.push(entry);
            updateNumber(card);
            updateChanges(card);
            input.value = '';
          } else {
            input.focus();
          }
        }
      }

      // delete list item
      if (/del_/.test(ev.target.id)) {
        const listParent = ev.target.parentNode.parentNode;
        const entryID = ev.target.parentNode.id;
        listParent.removeChild(ev.target.parentNode);
        card.entries = card.entries.filter((entry) => entry.id !== entryID);
        updateNumber(card);
        updateChanges(card);
      }

      // delete card element
      if (/remove_/.test(ev.target.id)) {
        const id = ev.target.id.replace('remove', '');
        const el = document.getElementById(id);
        if (el !== null) {
          el.parentNode.removeChild(el);
          ApiService.deleteCardItem({ id });
        }
      }

      // expand lists
      if (ev.target.id === `expand_${card.id}`) {
        ev.preventDefault();
        const listsCard = document.getElementById(`card_${card.id}`);
        const expanded = listsCard.getAttribute('data-expanded') === 'true';
        listsCard.setAttribute('data-expanded', !expanded);
        listsCard.classList.toggle('hided');

        // select other cards and collapse them
        const othersCards = document.querySelectorAll('.card-result__lists');
        [...othersCards]
          .filter((el) => el.id !== `card_${card.id}`)
          .filter((el) => el.dataset.expanded === 'true')
          .forEach((el) => {
            el.classList.add('hided');
            el.setAttribute('data-expanded', 'false');
          });

        if (!expanded) {
          Utilties.srollTo(listsCard.offsetTop);
        }
      }
    };

    cardElement.addEventListener('click', handleClick);
  },

  createResultCard: async (data) => {
    // get weather data
    const weather = await ApiService.weather({
      lat: data.position.latlng[0],
      lon: data.position.latlng[0],
      time: APP.moment(data.time),
    });

    const configs = {
      id: Utilties.ID(),
      country: data.position.name,
      image: data.image,
      entries: [],
      time: data.time,
      dailyWeather: weather.daily !== undefined ? weather.daily.data[0] : null,
    };

    card.createWeatherCard(configs);
    await ApiService.addData(configs);
  },
};

export default card;
