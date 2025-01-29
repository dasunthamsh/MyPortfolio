
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


// about me section local time

function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    document.getElementById('time').innerText = `${hours}:${minutes}`;
    document.getElementById('amPm').innerText = amPm;
}


// main image make 3D in about me section

updateTime();
setInterval(updateTime, 1000);

let el = document.querySelector('#mainPng')
const height = el.clientHeight
const width = el.clientWidth

el.addEventListener('mousemove', handleMove)
function handleMove(e) {
    const xVal = e.layerX
    const yVal = e.layerY
    const yRotation = 20 * ((xVal - width / 2) / width)
    const xRotation = -20 * ((yVal - height / 2) / height)
    const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
    el.style.transform = string
}

el.addEventListener('mouseout', function() {
    el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
})
el.addEventListener('mousedown', function() {
    el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
})
el.addEventListener('mouseup', function() {
    el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
})



// 3D animation

const canvas = document.getElementById("threeCanvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Background to black

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

// Icosahedron
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
const icosahedronMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffff00 }); // Yellow color
const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
scene.add(icosahedron);

// Stars
const starGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
const starMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffff00 }); // Yellow color
const stars = [];

for (let i = 0; i < 100; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    const distance = THREE.MathUtils.lerp(2, 3.5, Math.random());
    const yAngle = THREE.MathUtils.degToRad(80 + Math.random() * 20);
    const xAngle = THREE.MathUtils.degToRad(i * 3.6);
    star.position.setFromSphericalCoords(distance, yAngle, xAngle);
    stars.push(star);
    scene.add(star);
}

// Scroll-based animation
let scrollYProgress = 0; // Keeps track of scroll progress (0 to 1)
document.body.style.height = "500vh"; // Set the page height for scrolling

window.addEventListener("scroll", () => {
    const scrollMax = document.body.scrollHeight - window.innerHeight;
    scrollYProgress = window.scrollY / scrollMax;
});

// Animation loop
function animate() {
    const yAngle = THREE.MathUtils.lerp(0.001, Math.PI, scrollYProgress);
    const distance = THREE.MathUtils.lerp(10, 3, scrollYProgress);
    const time = performance.now() * 0.0005;

    camera.position.setFromSphericalCoords(distance, yAngle, time);
    camera.lookAt(0, 0, 0);

    icosahedron.rotation.x += 0.01;
    icosahedron.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// Handle resizing
window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

animate();



// // word animation

const carouselInner = document.getElementById('carousel-inner');
const dots = document.querySelectorAll('button');
let currentIndex = 0;

function goToSlide(index) {
    currentIndex = index;
    const offset = -100 * index;
    carouselInner.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('bg-gray-800');
            dot.classList.remove('bg-gray-400');
        } else {
            dot.classList.add('bg-gray-400');
            dot.classList.remove('bg-gray-800');
        }
    });
}

// Initialize the carousel
updateDots();


window.addEventListener('scroll', function() {
    // Get the scroll position
    const scrollPosition = window.scrollY - 5500;

    // Select the columns
    const colOne = document.getElementById('imageColOne');
    const colTwo = document.getElementById('imageColTwo');
    const colThree = document.getElementById('imageColThree');
    const colFour = document.getElementById('imageColFour');

    // Apply scroll-based transform to each column
    colOne.style.transform = `translateY(${scrollPosition / 3}px)`; // Moves up
    colTwo.style.transform = `translateY(-${scrollPosition / 2}px)`; // Moves down
    colThree.style.transform = `translateY(${scrollPosition / 3}px)`; // Moves up
    colFour.style.transform = `translateY(-${scrollPosition / 2}px)`; // Moves down

});




