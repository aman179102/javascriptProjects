// Detect if the device is mobile (has touch support)
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    lerp: 0.1,
    multiplier: 8,
});

// First page animation
function firstPageAnim() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.4,
        ease: "power4.inOut"
    })
    .to(".boundingelem", {
        y: '0',
        duration: 1,
        ease: "power4.inOut",
        stagger: 0.2
    })
    .from(".hfooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: "power4.inOut",
        delay: -1
    });
}

// Circle follower animation (Only for non-mobile devices)
function circleFollower(xscale, yscale) {
    if (isMobile) return; // Skip if it's a mobile device

    window.addEventListener("mousemove", function(dets) {
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

// Skew circle based on mouse movement (Only for non-mobile devices)
function skewcircle() {
    if (isMobile) return; // Skip if it's a mobile device

    var xscale = 1;
    var yscale = 1;
    var xprevious = 0;
    var yprevious = 0;

    window.addEventListener("mousemove", function(dets) {
        var xdiff = dets.clientX - xprevious;
        var ydiff = dets.clientY - yprevious;
        xprevious = dets.clientX;
        yprevious = dets.clientY;

        // Clamping the scale values
        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

        // Calling circleFollower with updated scales
        circleFollower(xscale, yscale);
    });
}

// Function to animate images inside .elem divs (Only on non-mobile devices)
if (!isMobile) {
    document.querySelectorAll(".elem").forEach(function(elem) {
        var rotate = 0;
        var diffrot = 0;

        elem.addEventListener("mousemove", function(dets) {
            diffrot = dets.clientX - rotate;
            rotate = dets.clientX;

            const img = elem.querySelector("img");
            const rect = elem.getBoundingClientRect();

            // Calculate mouse position relative to the div
            const mouseX = dets.clientX - rect.left;
            const mouseY = dets.clientY - rect.top;

            // Set the image to follow the mouse with GSAP animation
            gsap.to(img, {
                x: mouseX - img.width / 2,  // Center image with mouse pointer
                y: mouseY - img.height / 2, // Center image with mouse pointer
                ease: "power1.inOut", // Ease for smooth animation
                duration: 0.1, // Short duration for quick response
                rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8),
            });
        });
    });
} else {
    // On mobile, hide the images in the .elem divs
    document.querySelectorAll(".elem img").forEach(function(img) {
        img.style.visibility = 'hidden'; // Hide images on touch devices
    });
}

// Initialize functions (only on non-mobile devices)
if (!isMobile) {
    circleFollower(1, 1); // Default scale values for the circle follower
    skewcircle(); // Initialize skew circle effect
}

// Initialize first page animation
firstPageAnim();
