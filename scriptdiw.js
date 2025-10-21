const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particles = [];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.dx = Math.random() * 4 - 2;
    this.dy = Math.random() * 4 - 2;
    this.life = 100;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.dy += 0.04;
    this.life--;
  }
}

function createFirework(x, y) {
  const colors = ['#ff0040', '#ffea00', '#00ff66', '#33ccff', '#ff6600'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 32; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0,0,0,0.13)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].life <= 0) particles.splice(i, 1);
  }
  requestAnimationFrame(animate);
}

// Fireworks on interval and tap
setInterval(() => {
  createFirework(
    Math.random() * canvas.width,
    Math.random() * canvas.height * 0.5
  );
}, 1200);

function fireworkAtEvent(e) {
  let x, y;
  if (e.touches && e.touches.length > 0) {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }
  createFirework(x, y);
}

canvas.addEventListener('click', fireworkAtEvent);
canvas.addEventListener('touchstart', fireworkAtEvent);

// Diya click glowing
const diya = document.getElementById('diya');
const flame = document.getElementById('flame');
diya.addEventListener('click', () => {
  flame.classList.add('bright');
  setTimeout(() => flame.classList.remove('bright'), 600);
  createFirework(window.innerWidth / 2, window.innerHeight * 0.72);
});

animate();

