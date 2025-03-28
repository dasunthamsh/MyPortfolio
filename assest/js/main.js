// scroll animations
AOS.init();

/* Store the element in el */
let el = document.querySelector('#mainPng')

/* Get the height and width of the element */
const height = el.clientHeight
const width = el.clientWidth

/*
  * Add a listener for mousemove event
  * Which will trigger function 'handleMove'
  * On mousemove
  */
el.addEventListener('mousemove', handleMove)

/* Define function a */
function handleMove(e) {
    /*
      * Get position of mouse cursor
      * With respect to the element
      * On mouseover
      */
    /* Store the x position */
    const xVal = e.layerX
    /* Store the y position */
    const yVal = e.layerY

    /*
      * Calculate rotation valuee along the Y-axis
      * Here the multiplier 20 is to
      * Control the rotation
      * You can change the value and see the results
      */
    const yRotation = 20 * ((xVal - width / 2) / width)

    /* Calculate the rotation along the X-axis */
    const xRotation = -20 * ((yVal - height / 2) / height)

    /* Generate string for CSS transform property */
    const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'

    /* Apply the calculated transformation */
    el.style.transform = string
}

/* Add listener for mouseout event, remove the rotation */
el.addEventListener('mouseout', function() {
    el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
})

/* Add listener for mousedown event, to simulate click */
el.addEventListener('mousedown', function() {
    el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
})

/* Add listener for mouseup, simulate release of mouse click */
el.addEventListener('mouseup', function() {
    el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
})



                            // ---------------------------------loading form animation---------------------------//

// document.addEventListener('DOMContentLoaded', function() {
//     // Hide the loader when the page finishes loading
//     window.addEventListener('load', function() {
//         var loader = document.querySelector('#loader');
//         loader.style.opacity = '0';
//         setTimeout(function() {
//             loader.style.display = 'none';
//         }, 600); // Adjust the delay as needed
//     });
// });


                            // ---------------------------------education---------------------------//




document.addEventListener('DOMContentLoaded', function() {
    var mouse = document.getElementById('#mouse');

    mouse.addEventListener('mouseenter', function() {
        this.style.visibility = 'visible';
    });

    mouse.addEventListener('mouseleave', function() {
        this.style.visibility = 'hidden';
    });
});



// change header color when scrolling mouse

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const content = document.getElementById('content');
    const scrollPosition = window.scrollY || window.pageYOffset;
    const contentOffset = content.offsetTop;

    if (scrollPosition >= contentOffset) {
        header.style.backgroundColor = 'black';
    } else {
        header.style.backgroundColor = 'transparent ';
    }
});





///////////////////////////////////////////////    test functions //////////////////////////////////////////



