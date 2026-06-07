class Particle {
  constructor(x, y, r, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }

  step(width, height) {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
  }
}

function initParticles(canvas) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;
  const colors = ['rgba(255,209,102,0.34)', 'rgba(43,108,176,0.28)', 'rgba(91,124,43,0.22)'];
  let particles = [];

  function seed() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    const count = Math.max(24, Math.floor((width * height) / 42000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(
        Math.random() * width,
        Math.random() * height,
        1.2 + Math.random() * 2.8,
        (Math.random() - .5) * 1.15,
        (Math.random() - .5) * 1.15,
        colors[i % colors.length]
      ));
    }
  }

  function resize() {
    seed();
  }
  window.addEventListener('resize', resize);
  seed();

  function drawLinks() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > 120) continue;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(43,108,176,${(1 - d / 120) * 0.13})`;
        ctx.lineWidth = 1;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    drawLinks();
    for (const p of particles) {
      p.step(width, height);
      p.draw(ctx);
    }
    requestAnimationFrame(animate);
  }
  animate();
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  if (canvas) initParticles(canvas);
});

export {};
