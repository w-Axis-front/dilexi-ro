export default function nav() {
    const burger_button = document.querySelector('.nav__burger');
    const burgerNav = $('.burger-menu');
    const burgerNavItems = document.querySelectorAll(".burger-menu__link");

    function closeNav() {
        burgerNav.hide();
        burger_button.classList.remove('nav__burger--active');
    }

    function dropMenu() {
        if (burger_button.classList.contains('nav__burger--active')) {
            closeNav();
        } else {
            burger_button.classList.add('nav__burger--active');
            burgerNav.css({"display": "flex"});
        }
    }

    function navHandler() {
        if (burger_button) {
            burger_button.addEventListener('click', dropMenu);
        }
        for (let i = 0; i < burgerNavItems.length; i++) {
            burgerNavItems[i].addEventListener('click', closeNav);
        }
    }
    navHandler();
}
