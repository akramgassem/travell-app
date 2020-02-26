

export const logoContainer = () => {
    const container = document.querySelector('.logo-container');
    const img = document.createElement('img');
    img.src = APP.logo;
    img.alt = 'travel-app logo';
    container.append(img);
};