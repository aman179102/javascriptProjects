const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    lerp:0.11,
    multiplier:8,
});

// First page animation
function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.4,
        ease: "power4.inOut" // Corrected GSAP easing
    })
    .to(".boundingelem", {
        y: '0',
        duration: 1,
        ease: "power4.inOut", // Corrected GSAP easing
        stagger: 0.2
    })
    .from(".hfooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: "power4.inOut", // Corrected GSAP easing
        delay: -1
    });
}

// Circle follower animation
function circleFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

// Skew circle based on mouse movement
function skewcircle(){
    var xscale = 1;
    var yscale = 1;
    var xprevious = 0;
    var yprevious = 0;

    window.addEventListener("mousemove", function(dets){
        var xdiff = dets.clientX - xprevious;
        var ydiff = dets.clientY - yprevious;
        xprevious = dets.clientX;
        yprevious = dets.clientY;

        // Clamping the scale values
        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

        // Calling circle follower with updated scales
        circleFollower(xscale, yscale);
    });
}

// Function to animate images inside .elem divs
document.querySelectorAll(".elem").forEach(function(elem){

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove", function(dets){
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
            rotate : gsap.utils.clamp(-20,20,diffrot*0.8),
        });
    });
});



// Initialize functions
circleFollower(1, 1); // Default scale values for the circle follower
firstPageAnim(); // Initialize first page animation
skewcircle(); // Initialize skew circle effect
