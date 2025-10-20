const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    this.dy += 0.05; // gravity
    this.life--;
  }
}

// automatic fireworks burst
function createFirework(x, y) {
  const colors = ['#ff0040', '#ffea00', '#00ff66', '#33ccff', '#ff6600'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 40; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

// user-click fireworks
document.addEventListener('click', (e) => {
  createFirework(e.clientX, e.clientY);
});

// diya click glowing
const diya = document.getElementById('diya');
const flame = document.getElementById('flame');

diya.addEventListener('click', () => {
  flame.classList.add('bright');
  setTimeout(() => flame.classList.remove('bright'), 600);
  createFirework(window.innerWidth / 2, window.innerHeight / 2);
});

// responsive handling
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

setInterval(() => {
  createFirework(Math.random() * canvas.width, Math.random() * canvas.height / 2);
}, 1000);

animate();

