
// when scroll web change 'DASUN THAMASH' text x position

window.addEventListener('scroll', function() {
    // Get the scroll position
    const scrollPosition = window.scrollY;

    // Select the h1 element
    const heading = document.getElementById('scrollingText');

    // Change the X position based on scroll
    heading.style.transform = `translateX(${scrollPosition / 2}px)`; // Adjust speed by dividing scrollPosition
});



// arrow to redirect to hero section

    window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const contactLink = document.getElementById('contact-link');
    const arrowContainer = document.getElementById('arrow-container');

    if (scrollPosition > 100) { // Show the arrow after scrolling 100px
    contactLink.style.display = 'none'; // Hide the original Contact link
    arrowContainer.style.display = 'block'; // Show the arrow container
} else {
    contactLink.style.display = 'block'; // Show the original Contact link when scrolled back to top
    arrowContainer.style.display = 'none'; // Hide the arrow container
}
});
