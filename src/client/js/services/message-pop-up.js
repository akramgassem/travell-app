import Utilties from '../utils';

let _counter = 0;

export default class MessagePopUp {
  constructor(message, color) {
    this._message = message;
    this._color = 'is-' + color;
    // eslint-disable-next-line no-undef
    this.id = Utilties.ID();
    this.element = null;
    this.timerDelete = null;
    this._handleDelete = this._handleDelete.bind(this);
    this._createUi();
  }

  static show(message, color) {
    return new MessagePopUp(message, color);
  }

  _createUi() {
    const article = document.createElement('article');
    article.setAttribute('id', this.id);
    article.classList.add('notification');
    article.classList.add(this._color);
    article.innerHTML = `<button id="${this.id}_delete" class="delete"></button> ${this._message}`;
    this.element = article;
    _counter++;
    this._setTimeout(_counter * 1000, () => {
      const notifications = document.querySelector('.notifications');
      notifications.prepend(article);
      article.addEventListener('click', this._handleDelete);

      this._deleteElement(this.element, 8000, true);
    });
  }

  _handleDelete(ev) {
    if (ev.target.getAttribute('id') === this.id + '_delete') {
      this._deleteElement(this.element, 50, false);
    }
  }

  _deleteElement(el, delay, condition) {
    this._setTimeout(delay, () => {
      _counter--;
      el.classList.add('hide');
      if (condition) {
        this._setTimeout(600, () => {
          el.parentNode.removeChild(el);
        });
      }
    });
  }

  _setTimeout(delay, fn) {
    const h = setTimeout(() => {
      window.clearTimeout(h);
      fn();
    }, delay);
  }
}
