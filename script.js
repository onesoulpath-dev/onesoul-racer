const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const car = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    speed: 0,
    maxSpeed: 5,
    width: 20,
    height: 40
};

const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false
};

const acceleration = 0.2;
const turnSpeed = 0.05;
const friction = 0.95;

function update() {
    if (keys.forward) {
        car.speed += acceleration;
        if (car.speed > car.maxSpeed) car.speed = car.maxSpeed;
    }
    if (keys.backward) {
        car.speed -= acceleration;
        if (car.speed < -car.maxSpeed) car.speed = -car.maxSpeed;
    }
    if (keys.left) {
        car.angle -= turnSpeed;
    }
    if (keys.right) {
        car.angle += turnSpeed;
    }

    car.x += Math.cos(car.angle) * car.speed;
    car.y += Math.sin(car.angle) * car.speed;

    car.speed *= friction;

    // keep car within bounds
    if (car.x < 0) car.x = canvas.width;
    if (car.x > canvas.width) car.x = 0;
    if (car.y < 0) car.y = canvas.height;
    if (car.y > canvas.height) car.y = 0;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);
    ctx.fillStyle = 'red';
    ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
    ctx.restore();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();

function setKey(code, isPressed) {
    switch (code) {
        case 'ArrowUp':
        case 'Numpad8':
            keys.forward = isPressed;
            break;
        case 'ArrowDown':
        case 'Numpad2':
            keys.backward = isPressed;
            break;
        case 'ArrowLeft':
        case 'Numpad4':
            keys.left = isPressed;
            break;
        case 'ArrowRight':
        case 'Numpad6':
            keys.right = isPressed;
            break;
    }
}

document.addEventListener('keydown', e => setKey(e.code, true));
document.addEventListener('keyup', e => setKey(e.code, false));
