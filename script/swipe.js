let slideImage = document.querySelectorAll(".swipe_img");
slideImage.forEach((img) => {
    img.addEventListener("dragstart", (e) => {
        console.log("iwlavotti dragstar ");
        e.preventDefault();
    });
});

let sliderSwipe = document.querySelector(".section_7_swipe");

// mobile touch screen
sliderSwipe.addEventListener('touchstart', touchStart, false);
sliderSwipe.addEventListener('touchmove', touchMove, false);
// mouse touch screen
sliderSwipe.addEventListener('mousedown', touchStart); // tegganda       
sliderSwipe.addEventListener('mousemove', touchMove); // ustida yurgizganda 

let xDown = null;
let yDown = null;

function touchStart(evt) {
    xDown = getPositionX(evt);
    yDown = getPositionY(evt);
};

function touchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = getPositionX(evt);
    let yUp = getPositionY(evt);

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            /* left swipe */
            galleryPlusSlide(-1);
        } else {
            /* right swipe */
            galleryPlusSlide(1);
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};


function getPositionX(event) {
    return event.type.includes("mouse") ?
        event.clientX :
        event.touches[0].clientX;
}

function getPositionY(event) {
    return event.type.includes("mouse") ?
        event.clientY :
        event.touches[0].clientY;
}