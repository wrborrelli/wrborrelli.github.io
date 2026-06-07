class Particle {
  constructor(x,y,r,dx,dy,color){ this.x=x; this.y=y; this.r=r; this.dx=dx; this.dy=dy; this.color=color; }
  draw(ctx){ ctx.beginPath(); ctx.fillStyle=this.color; ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill(); }
  step(width,height){ this.x += this.dx; this.y += this.dy; if(this.x<0||this.x>width) this.dx *= -1; if(this.y<0||this.y>height) this.dy *= -1; }
}

function initParticles(canvas){
  const ctx = canvas.getContext('2d');
  let width=canvas.width=canvas.offsetWidth; let height=canvas.height=canvas.offsetHeight;
  const colors = ['rgba(255,209,102,0.18)','rgba(59,130,246,0.12)','rgba(99,102,241,0.12)'];
  const particles = [];
  const count = Math.max(12, Math.floor((width*height)/80000));
  for(let i=0;i<count;i++){ particles.push(new Particle(Math.random()*width, Math.random()*height, 1+Math.random()*3, (Math.random()-.5)*.6, (Math.random()-.5)*.6, colors[i%colors.length])); }

  function resize(){ width=canvas.width=canvas.offsetWidth; height=canvas.height=canvas.offsetHeight; }
  window.addEventListener('resize', resize);

  function animate(){ ctx.clearRect(0,0,width,height); for(let p of particles){ p.step(width,height); p.draw(ctx); }
    requestAnimationFrame(animate);
  }
  animate();
}

document.addEventListener('DOMContentLoaded', ()=>{
  const canvas = document.getElementById('hero-canvas');
  if(canvas) initParticles(canvas);
});

export {};
