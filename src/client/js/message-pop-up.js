let _counter = 0;

export default class MessagePopUp {
  constructor(message, color) {
    const classnames = {
      info: "is-info",
      danger: "is-danger",
      success: "is-success",
      warning: "is-warning"
    };
    this._message = message;
    this._color = classnames[color];
    this.id = this._ID();
    this.element = null;
    this.timerDelete = null;
    this._handleDelete = this._handleDelete.bind(this);
    this._createUi();
  }

  _ID() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  _createUi() {
    const article = document.createElement("article");
    article.setAttribute("id", this.id);
    article.classList.add("notification");
    article.classList.add(this._color);
    article.innerHTML = `
          <button id="${this.id}_delete" class="delete"></button>
          ${this._message}
        `;

    this.element = article;

    _counter++;
    this.setTimeout(_counter * 1000, () => {

      const notifications = document.querySelector(".notifications");
      notifications.prepend(article);
      article.addEventListener("click", this._handleDelete);

      this._deleteElement(this.element, 8000, true);
    });
  }

  _handleDelete(ev) {
    if (ev.target.getAttribute("id") === this.id + "_delete") {
      this._deleteElement(this.element, 300, false);
    }
  }

  _deleteElement(el, delay, condition) {
    this.setTimeout(delay, () => {
      _counter--;
      el.classList.toggle("hide");

      if (condition) {
        this.setTimeout(600, () => {
          el.parentNode.removeChild(el);
        });
      }
    });
  }

  setTimeout(delay, fn) {
    const h = setTimeout(() => {
      window.clearTimeout(h);
      fn();
    }, delay);
  }
}
