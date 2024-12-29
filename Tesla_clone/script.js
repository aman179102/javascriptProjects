
// appearance of nav bar when scrolling to top

let lastScrollTop = 0;
const navbar = document.getElementById('navigationbar');
const sliderTop = document.querySelector('.slider-top');

window.addEventListener('scroll', function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        navbar.classList.add('hidden');
    } 
    else {
        navbar.classList.remove('hidden');
        navbar.classList.add('scrolled-up');
    }

    if (scrollTop === 0) {
        navbar.classList.remove('scrolled-up');
        navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});


//slider top nav bar functioning

const hoverItems = document.querySelectorAll('.links a');
const allA = document.querySelectorAll('.links a');
const allI = document.querySelectorAll('.icons i');

hoverItems.forEach(hoverItem => {

    //we robot nav element slider top off

    if (hoverItem.textContent.trim() === "We, Robot") {
        return;
    }

        hoverItem.addEventListener('mouseenter', () => {
        document.getElementById('Vehicles').style.display = "none"
        document.getElementById('Energy').style.display = "none"
        document.getElementById('Charging').style.display = "none"
        document.getElementById('Discover').style.display = "none"
        document.getElementById('Shop').style.display = "none"
        document.getElementById(hoverItem.textContent).style.display = "flex"
        document.body.style.overflowY = 'hidden';
        document.querySelector('.slider-top').style.visibility = 'visible';
        document.querySelector('.slider-top').style.top = '0';
        document.querySelector('.blur').style.display = "block";

        const svgPaths = document.querySelectorAll('nav svg path');
        svgPaths.forEach(path => {
            path.style.fill = 'black';
        });

        allA.forEach(a => {
            a.style.color = 'black';
        });

        allI.forEach(i => {
            i.style.color = 'black';
        });
    });

    sliderTop.addEventListener('mouseleave', () => {
        document.body.style.overflowY = 'auto';
        document.querySelector('.slider-top').style.top = '-100%';
        document.querySelector('.slider-top').style.visibility = 'hidden';
        document.querySelector('.blur').style.display = "none";
        const svgPaths = document.querySelectorAll('nav svg path');
        svgPaths.forEach(path => {
            path.style.fill = 'white';
        });
        allA.forEach(a => {
            a.style.color = 'white';
        });
        allI.forEach(i => {
            i.style.color = 'white';
        });
    });
});
