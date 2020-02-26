export default class MessagePopUp {
    constructor(message, color) {
        const classnames = {
            info: 'is-info',
            danger: 'is-danger',
            success: 'is-success',
            warning: 'is-warning'
        };
        this._message = message;
        this._color = classnames[color];
        this.id = this._ID();
        this._createUi();
    }

    _ID () {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    
    _createUi() {
        const article = document.createElement('article');
        article.setAttribute('id', this.id);
        article.classList.add('notification');
        article.classList.add(this._color);
        article.innerHTML = `
          <button id="${this.id}_delete" class="delete"></button>
          ${this._message}
        `;

        const notifications = document.querySelector('.notifications');
        notifications.append(article);
        article.addEventListener('click', this._handleDelete);
        return article;
    }

    _handleDelete(ev) {
        if(ev.target.getAttribute('id') === this.id + '_delete') {
            this.classList.toggle('hide');
            
            const timer = setInterval(() => {
                const container = document.querySelector('.notifications');
                container.removeChild(this);
            }, 2000);

            window.clearTimeout(timer);
        }
    }

    
}