export default class PixaImages {
  constructor(delay, categorie, query) {
    this.images = null;
    this.element = null;
    this.delay = delay;
    this.tags = "";
    this.link = "";
    this.handleReload = this.handleReload.bind(this);
    this.createUi();
    this.timer = null;
    this.categorie = categorie;
    this.query = query;
  }

  handleReload(ev) {
    if (ev.target.getAttribute("id") === "reload") {
      localStorage.clear();
      window.clearTimeout(this.timer);
      this._populateUi(this.element);
      console.log(this);
    }
  }

  async createUi() {
    const container = document.createElement("div");
    container.classList.add("pixa-image-container");
    const mainEl = document.getElementsByTagName("main")[0];
    mainEl.appendChild(container);

    container.innerHTML = `
    <div class="logo-container"></div>
            <div class="overlay"></div>
            <div id="tags" class="tags">${this.tags}</div>
            <div id="links" class="links">
                <a  class="is-link" href="${this.link}" target="_blank">Source</a>
            </div>
            <button  id="reload" class="button reload is-small is-warning is-rounded">
                <span id="reload" class="icon is-small">
                    <i id="reload" class="fas fa-camera-retro"></i>
                </span>
            <span id="reload">Reload</span>
            </button>
        `;
    await this._populateUi(container);
    this._logoContainer();

    container.addEventListener("click", this.handleReload, false);
    this.element = container;
  }

  async _getImages() {
    const imgs = await APP.postData("/pixa/", {
      query: ["paris"],
      categorie: "places"
    });

    if (imgs.message === 200) {
      const parsed = JSON.parse(imgs.data).hits;
      localStorage.setItem("images", JSON.stringify(parsed));
      return parsed;
    } else {
    }
  }

  async _cacheImages() {
    if (localStorage.getItem("images") === null || this.images === null) {
      return await this._getImages();
    } else {
      const cache = localStorage.getItem("images");
      return JSON.parse(cache);
    }
  }

  async _populateUi(container) {
    this.images = await this._cacheImages();
    this._randomURL(container, this._randomInt());
    this.timer = setInterval(() => {
      this._randomURL(container, this._randomInt());
    }, this.delay * 1000);
  }

  _randomURL(el, int) {
    const image = this.images[int];
    // remove tags div
    const currTags = document.querySelector("#tags");
    currTags.parentNode.removeChild(currTags);

    // remove link container
    const currLink = document.querySelector("#links");
    currLink.parentNode.removeChild(currLink);

    let url = image.largeImageURL;
    this.tags = image.tags;

    let tagsContainer = `<div id="tags" class="tags">${this.tags}</div>`;
    el.innerHTML += tagsContainer;
    new APP.MessagePopUp(this.tags, "info");

    this.link = image.pageURL;
    let linkHTML = this._createLink(this.link, image.user, image.views);
    let linkContainer = this._createElement("links", "links", linkHTML);
    el.appendChild(linkContainer);
    el.style.backgroundImage = `url(${url})`;
  }

  _randomInt() {
    return Math.floor(Math.random() * Math.floor(this.images.length));
  }

  _createElement(classname = "", id = "", innerHTML = "") {
    const el = document.createElement("div");
    el.setAttribute("id", id);
    el.classList.add(classname);
    el.innerHTML = innerHTML;
    return el;
  }

  _createLink(link, user, views) {
    return `
    <a class="is-link" href="${link}" target="_blank">
        <div>Pixabay-user: ${user}</div>
        <div>Views: ${views}</div>
    </a>
    `;
  }

  _logoContainer() {
    const container = document.querySelector(".logo-container");
    const relative = this._createElement("logo-relative");
    const img = document.createElement("img");
    img.src = APP.logo;
    img.alt = "travel-app logo";
    relative.append(img);
    container.append(relative);
  }
}
