export default class PixaImages {
	constructor() {
        this.images = null;
        this.element = null;
        this.handleReload = this.handleReload.bind(this);
        this.createUi();
	}

	handleReload(ev) {
		if (ev.target.getAttribute('id') === 'reload') {
            localStorage.clear();
            this._populateUi(this.element);
		}
	}

	async createUi() {
		const container = document.createElement('div');
		container.classList.add('pixa-image-container');
		const mainEl = document.getElementsByTagName('main')[0];
		mainEl.appendChild(container);

		container.innerHTML = `
            <div class="overlay"></div>
            <button id="reload" class="button is-small is-dark is-rounded">
                <span class="icon is-small">
                    <i class="fas fa-camera-retro"></i>
                </span>
            <span>Reload</span>
            </button>
        `;
        await this._populateUi(container);

        container.onclick = this.handleReload;
        this.element = container;
        
	}

	async _getImages() {
		const imgs = await APP.getData('/pixa/');
		const parsed = JSON.parse(imgs.data).hits;
		localStorage.setItem('images', JSON.stringify(parsed));
		return parsed;
	}

	async _cacheImages() {
		if (localStorage.getItem('images') === null) {
			return await this._getImages();
		} else {
			const cache = localStorage.getItem('images');
			return JSON.parse(cache);
		}
	}

	async _populateUi(container) {
		this.images = await this._cacheImages();
		this._randomURL(container, this._randomInt());
		setInterval(() => {
			this._randomURL(container, this._randomInt());
		}, 6000);
	}

	_randomURL(el, int) {
		let url = this.images[int].largeImageURL;
		el.style.backgroundImage = `url(${url})`;
	}

	_randomInt() {
		return Math.floor(Math.random() * Math.floor(this.images.length));
	}
}


