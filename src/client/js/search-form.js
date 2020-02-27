export default class SearchForm {
    constructor(container) {
        this._container = container;
        this.element = null;
        this._init();
        console.log(this);
        
    }

    _init() {
        const form = document.createElement('form');
        form.innerHTML = `
        <div class="control  has-icons-right">
            <input class="input is-medium" type="text" placeholder="Place to travel">
            <span class="icon is-right">
            <i class="fas fa-envelope"></i>
            </span>
            
        </div>
        `;
        this.element = form;
        this._container.append(this.element);
    }
}