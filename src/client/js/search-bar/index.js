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
    this._selectUi();

    // autocomplete values
    this.currentFocus = null;
    this.idList = APP.ID();
    this._place = null;
  }

  static init(header) {
    return new SearchBar(header);
  }

  async _selectUi() {
    this.form = document.querySelector("#searchBarForm");
    this.form.addEventListener("submit", this._formHandler, false);
    this.form.addEventListener("input", this._handleInput);
    this.form.addEventListener("keydown", this._handleKeyInput);
    this.help = document.querySelector("#place-help");
    document.addEventListener("click", this._clickOut);
    this.countries = await this._getCountries();
  }

  async _getCountries() {
    const countries = await APP.getCountries();
    return countries;
  }

  _formHandler(ev) {
    ev.preventDefault();
    this._submitValue(ev);
  }

  _handleInput() {
    let inputValue = this.form.placeInput.value;
    this._closeAllLists();
    if (!inputValue) {
      return false;
    }
    this.currentFocus = -1;
    const formContainer = this.form.querySelector(".form-container");
    formContainer.appendChild(this._createList(inputValue));
  }

  _handleKeyInput(ev) {
    let currentList = document.getElementById(
      this.idList + "_autocomplete-list"
    );
    if (ev.keyCode === 27) { this._closeAllLists(); }
    if (currentList) currentList = currentList.querySelectorAll('.coutrie-container');
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
    [...item].forEach(el => {
      el.classList.remove("autocomplete-active");
    });
    if (this.currentFocus >= item.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = item.length - 1;
    item[this.currentFocus].classList.add("autocomplete-active");
  }


  _closeAllLists(elmnt) {
    const items = document.getElementsByClassName("autocomplete-items");
    [...items].forEach(item => {
      if (elmnt != item && elmnt != this.form.placeInput) {
        item.parentNode.removeChild(item);
      }
    });
  }

  _clickOut(ev) {
    this._closeAllLists(ev.target);
  }

  _createList(inputValue) {
    const list = document.createElement("DIV");
    list.setAttribute("id", this.idList + "_autocomplete-list");
    list.setAttribute("class", "autocomplete-items");
    this.countries.forEach(item => {
      const matchName =
        item.name.substr(0, inputValue.length).toUpperCase() ==
        inputValue.toUpperCase();
      const matchCapital =
        item.capital.substr(0, inputValue.length).toUpperCase() ==
        inputValue.toUpperCase();

      if (matchName | matchCapital) {
        const listItem = this._createListItem(item, matchName, matchCapital, inputValue);
        list.appendChild(listItem);
      }
    });

    return list;
  }

  _submitValue(ev) {
    if (this.form.placeInput.value === '' ) {
			this.form.placeInput.focus();
			ev.preventDefault();
			this.help.innerText = 'Oops! forgot to put a place?';
			return;
		} else if (this.form.timeInput.value === '') {
			this.form.timeInput.focus();
			ev.preventDefault();
			this.help.innerText = 'Oops! forgot to put a date?';
			return;
		} {
			ev.preventDefault();
			this.header.refresh([this.form.placeInput.value]);
      console.log(this.form.timeInput.value);
      
			APP.createResultCard({
				position: this._place,
				time: this.form.timeInput.value,
				image: this.header.currentImageUrl
			});
      this.form.placeInput.value = '';
      this.form.timeInput.value  = '';
			this.help.innerText = '';
		}
  }

  _createListItem(item, matchName, matchCapital, inputValue) {
    const listItem = document.createElement("div");
    listItem.classList.add('coutrie-container');
    
    const nameLetterMatch = item.name.substr(0, inputValue.length);
    const subName = item.name.substr(inputValue.length);
    const capitalLetterMatch = item.capital.substr(0, inputValue.length);
    const subCapital = item.capital.substr(inputValue.length);
    
    listItem.innerHTML = `
    
    <div class="countrie-name">
        <div class="flag">
            <img src="${item.flag}" alt="${item.name}">
        </div>

        <p class="countrie-fields">
          <span class="${ matchName ? "focus" : "" }">${nameLetterMatch}</span><span>${subName}</span>,
          <span class="${matchCapital ? "focus" : ""}">${capitalLetterMatch}</span><span>${subCapital}</span></span>
        </p>
      </div>
    `;

    listItem.innerHTML += `<input type='hidden' value="${item.name}">`;

    listItem.addEventListener('click', (ev) => {
      this.form.placeInput.value = listItem.getElementsByTagName("input")[0].value;
      this._place = item;
      this._closeAllLists();
    });
    return listItem;
  }
}
