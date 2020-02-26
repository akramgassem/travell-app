export default class PixaImages {
    constructor() {
        this.images = null;
        this.cacheImages();        
    }

    
    
 getImages() {
    APP.getData('/pixa/').then(
        res => {
            this.images = JSON.parse(res.data).hits;
            localStorage.setItem('images', JSON.stringify(this.images));
            console.log(this.images);
        }
    );
    }

    cacheImages() {
        if (this.images === null && localStorage.getItem('images') === null) {
            this.getImages();
            console.log('from server');
        } else {
            const cache = localStorage.getItem('images');
            this.images = JSON.parse(cache);
            console.log(this.images);
            console.log('cached');
        }
    }
}