
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



// word animation


const splitWords = () => {
    const textNode = document.querySelector(".text");
    const text = textNode.textContent;
    const newDomElements = text.split(" ").map((text) => {
        const highlighted =
            text.startsWith(`"30under30"`) ||
            text.startsWith(`CTO`) ||
            text.startsWith(`Mythrill`);
        return `<span class="word ${highlighted ? "highlighted" : null}">${text}</span>`;
    });
    textNode.innerHTML = newDomElements.join("");
};

const renderCanvas = () => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;
    const params = {
        isStatic: true,
        render: {
            fillStyle: "transparent"
        }
    };
    const canvasSize = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    const engine = Engine.create({});

    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            ...canvasSize,
            background: "transparent",
            wireframes: false
        }
    });
    const floor = Bodies.rectangle(
        canvasSize.width / 2,
        canvasSize.height,
        canvasSize.width,
        50,
        params
    );
    const wall1 = Bodies.rectangle(
        0,
        canvasSize.height / 2,
        50,
        canvasSize.height,
        params
    );
    const wall2 = Bodies.rectangle(
        canvasSize.width,
        canvasSize.height / 2,
        50,
        canvasSize.height,
        params
    );
    const top = Bodies.rectangle(
        canvasSize.width / 2,
        0,
        canvasSize.width,
        50,
        params
    );
    const wordElements = document.querySelectorAll(".word");
    const wordBodies = [...wordElements].map((elemRef) => {
        const width = elemRef.offsetWidth;
        const height = elemRef.offsetHeight;

        return {
            body: Matter.Bodies.rectangle(canvasSize.width / 2, 0, width, height, {
                render: {
                    fillStyle: "transparent"
                }
            }),
            elem: elemRef,
            render() {
                const { x, y } = this.body.position;
                this.elem.style.top = `${y - 20}px`;
                this.elem.style.left = `${x - width / 2}px`;
                this.elem.style.transform = `rotate(${this.body.angle}rad)`;
            }
        };
    });

    const mouse = Matter.Mouse.create(document.body);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    World.add(engine.world, [
        floor,
        ...wordBodies.map((box) => box.body),
        wall1,
        wall2,
        top,
        mouseConstraint
    ]);
    render.mouse = mouse;
    Runner.run(engine);
    Render.run(render);

    (function rerender() {
        wordBodies.forEach((element) => {
            element.render();
        });
        Matter.Engine.update(engine);
        requestAnimationFrame(rerender);
    })();
};

window.addEventListener("DOMContentLoaded", (event) => {
    splitWords();
    renderCanvas();
});
