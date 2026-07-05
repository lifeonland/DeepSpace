console.log('🚀 Deep Space Explorer - Full Edition');

const state = {
  canvas: null,
  ctx: null,
  planets: [],
  stars: [],
  asteroids: [],
  meteors: [],
  comets: [],
  satellites: [],
  speed: 5,
  starCount: 200,
  time: 0,
  selectedPlanet: null,
  pixelRatio: window.devicePixelRatio || 1,
  factIndex: 0
};

const PLANETS = [
  { name: 'Earth', type: 'earth', size: 70, temp: '15°C', gravity: '9.8 m/s²', desc: 'The blue marble - Our home', satellites: 1 },
  { name: 'Jupiter', type: 'gasgiant', size: 95, temp: '-110°C', gravity: '24.79 m/s²', desc: 'Massive gas giant', satellites: 4 },
  { name: 'Mars', type: 'rocky', size: 50, temp: '-63°C', gravity: '3.71 m/s²', desc: 'The red planet', satellites: 2 },
  { name: 'Saturn', type: 'gasgiant', size: 85, temp: '-140°C', gravity: '10.44 m/s²', desc: 'Ringed ice giant', hasRings: true, satellites: 3 },
  { name: 'Venus', type: 'toxic', size: 68, temp: '464°C', gravity: '8.87 m/s²', desc: 'Hottest planet', satellites: 0 },
  { name: 'Mercury', type: 'rocky', size: 40, temp: '167°C', gravity: '3.7 m/s²', desc: 'Closest to Sun', satellites: 0 },
  { name: 'Neptune', type: 'icegiant', size: 80, temp: '-200°C', gravity: '11.15 m/s²', desc: 'Blue ice giant', satellites: 2 },
  { name: 'Uranus', type: 'icegiant', size: 75, temp: '-224°C', gravity: '8.87 m/s²', desc: 'Tilted planet', satellites: 2 },
];

const FACTS = [
  '🌟 A day on Venus is longer than its year',
  '☀️ The Sun is 1.3M times bigger than Earth',
  '🪐 Saturn\'s rings are made of ice particles',
  '🌍 Earth is the only planet with liquid water',
  '💫 Jupiter has 95+ moons',
  '🌙 The Moon moves 3.8cm away per year',
  '⚡ Mercury has extreme temperatures',
  '🔴 Mars has the largest volcano',
  '❄️ Neptune\'s winds reach 2,100 km/h',
  '🌊 Europa has more water than Earth',
  '✨ Sunlight takes 8min 20s to reach Earth',
  '🪨 Asteroid belt has millions of rocks',
];

class Star {
  constructor(cw, ch) {
    this.x = Math.random() * cw;
    this.y = Math.random() * ch;
    this.size = Math.random() * 2.5 + 0.5;
    this.opacity = 0.3 + Math.random() * 0.7;
    this.twinkleSpeed = 0.001 + Math.random() * 0.005;
    this.color = ['#fff', '#ffe', '#eef', '#fee'][Math.floor(Math.random() * 4)];
  }
  
  draw(ctx, time) {
    const twinkle = 0.5 + 0.5 * Math.sin(time * this.twinkleSpeed);
    ctx.globalAlpha = this.opacity * twinkle;
    
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
    grad.addColorStop(0, this.color);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = grad;
    ctx.fillRect(this.x - this.size * 2, this.y - this.size * 2, this.size * 4, this.size * 4);
    ctx.globalAlpha = 1;
  }
}

class Asteroid {
  constructor(x, y) {
    this.x = x || Math.random() * 800;
    this.y = y || Math.random() * 600;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 3 + 1;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.1;
  }
  
  update() {
    this.x += this.vx * state.speed * 0.1;
    this.y += this.vy * state.speed * 0.1;
    this.rotation += this.rotationSpeed;
    
    if (this.x < 0) this.x = state.canvas.width;
    if (this.x > state.canvas.width) this.x = 0;
    if (this.y < 0) this.y = state.canvas.height;
    if (this.y > state.canvas.height) this.y = 0;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    ctx.fillStyle = '#8b7355';
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = i * Math.PI / 3 + Math.sin(i) * 0.3;
      const x = Math.cos(angle) * this.size;
      const y = Math.sin(angle) * this.size;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(139, 115, 85, 0.5)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    
    ctx.restore();
  }
}

class Meteor {
  constructor() {
    const edge = Math.random() * 4;
    if (edge < 1) {
      this.x = Math.random() * state.canvas.width;
      this.y = -10;
    } else if (edge < 2) {
      this.x = Math.random() * state.canvas.width;
      this.y = state.canvas.height + 10;
    } else if (edge < 3) {
      this.x = -10;
      this.y = Math.random() * state.canvas.height;
    } else {
      this.x = state.canvas.width + 10;
      this.y = Math.random() * state.canvas.height;
    }
    
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3;
    this.life = 100;
    this.maxLife = 100;
    this.size = Math.random() * 2 + 1;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }
  
  draw(ctx) {
    const alpha = this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = this.size;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.vx * 10, this.y - this.vy * 10);
    ctx.stroke();
    
    ctx.globalAlpha = 1;
  }
}

class Comet {
  constructor() {
    this.x = Math.random() * state.canvas.width;
    this.y = Math.random() * state.canvas.height * 0.3;
    this.vx = 0.5 + Math.random() * 0.5;
    this.vy = 0.1 + Math.random() * 0.2;
    this.size = 4;
  }
  
  update() {
    this.x += this.vx * state.speed * 0.05;
    this.y += this.vy * state.speed * 0.05;
    
    if (this.x > state.canvas.width + 50) {
      this.x = -50;
      this.y = Math.random() * state.canvas.height * 0.3;
    }
  }
  
  draw(ctx) {
    // Tail
    const tailLength = 60;
    const grad = ctx.createLinearGradient(this.x, this.y, this.x - tailLength, this.y - tailLength * 0.5);
    grad.addColorStop(0, 'rgba(100, 200, 255, 0.8)');
    grad.addColorStop(1, 'rgba(100, 200, 255, 0)');
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - tailLength, this.y - tailLength * 0.5);
    ctx.lineTo(this.x - tailLength, this.y + tailLength * 0.2);
    ctx.closePath();
    ctx.fill();
    
    // Head
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Satellite {
  constructor(planet) {
    this.planet = planet;
    this.distance = planet.size + 30 + Math.random() * 20;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.01 + Math.random() * 0.01;
    this.size = 3 + Math.random() * 2;
  }
  
  update() {
    this.angle += this.speed * state.speed * 0.05;
  }
  
  draw(ctx) {
    const x = this.planet.x + Math.cos(this.angle) * this.distance;
    const y = this.planet.y + Math.sin(this.angle) * this.distance;
    
    ctx.fillStyle = '#cccccc';
    ctx.beginPath();
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.planet.x, this.planet.y, this.distance, 0, Math.PI * 2);
    ctx.stroke();
  }
}

class Planet {
  constructor(data) {
    this.name = data.name;
    this.type = data.type;
    this.size = data.size;
    this.temp = data.temp;
    this.gravity = data.gravity;
    this.desc = data.desc;
    this.hasRings = data.hasRings || false;
    this.x = 100 + Math.random() * 600;
    this.y = 150 + Math.random() * 200;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.rotation = Math.random() * Math.PI * 2;
    this.hidden = false;
  }
  
  update() {
    this.rotation += 0.015;
    this.x += this.vx * state.speed * 0.3;
    this.y += this.vy * state.speed * 0.3;
    
    if (this.x < -150) this.x = state.canvas.width + 150;
    if (this.x > state.canvas.width + 150) this.x = -150;
    if (this.y < -150) this.y = state.canvas.height + 150;
    if (this.y > state.canvas.height + 150) this.y = -150;
  }
  
  drawEarth(ctx, x, y, r) {
    ctx.shadowColor = '#1e90ff';
    ctx.shadowBlur = 35;
    
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r * 1.2);
    grad.addColorStop(0, '#64b5f6');
    grad.addColorStop(0.5, '#1e90ff');
    grad.addColorStop(1, '#0d47a1');
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#2e7d32';
    for (let i = 0; i < 8; i++) {
      const angle = (this.rotation + i * Math.PI / 4);
      const cx = x + Math.cos(angle) * r * 0.4;
      const cy = y + Math.sin(angle) * r * 0.4;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.25, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, r + 3, 0, Math.PI * 2);
    ctx.stroke();
    
    const spec = ctx.createRadialGradient(x - r * 0.4, y - r * 0.4, 0, x, y, r);
    spec.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    spec.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = spec;
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawGasGiant(ctx, x, y, r) {
    const colors = this.name === 'Jupiter' 
      ? ['#ffa500', '#ff8c00', '#daa520', '#cc6600']
      : ['#daa520', '#f4a460', '#cd853f', '#8b4513'];
    
    ctx.shadowColor = colors[0];
    ctx.shadowBlur = 40;
    
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r * 1.2);
    grad.addColorStop(0, this.lighten(colors[0], 1.5));
    grad.addColorStop(0.4, colors[0]);
    grad.addColorStop(0.7, colors[1]);
    grad.addColorStop(1, this.darken(colors[2], 1.3));
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    
    for (let i = 0; i < 6; i++) {
      const ty = y - r + (r * 2 * i / 6);
      ctx.fillStyle = `rgba(${100 + i * 20}, ${80 + i * 15}, 0, ${0.1 + i * 0.03})`;
      ctx.fillRect(x - r, ty, r * 2, r * 0.2);
    }
    
    if (this.name === 'Jupiter') {
      const spotX = x + Math.cos(this.rotation * 0.5) * r * 0.3;
      const spotY = y + Math.sin(this.rotation * 0.3) * r * 0.2;
      ctx.fillStyle = 'rgba(200, 100, 50, 0.6)';
      ctx.beginPath();
      ctx.ellipse(spotX, spotY, r * 0.3, r * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const spec = ctx.createRadialGradient(x - r * 0.4, y - r * 0.4, 0, x, y, r);
    spec.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    spec.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = spec;
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawRocky(ctx, x, y, r) {
    const colors = this.name === 'Mars' 
      ? { main: '#cd5c5c', shadow: '#8b3a3a' }
      : { main: '#a9a9a9', shadow: '#505050' };
    
    ctx.shadowColor = colors.main;
    ctx.shadowBlur = 30;
    
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r * 1.2);
    grad.addColorStop(0, this.lighten(colors.main, 1.4));
    grad.addColorStop(0.5, colors.main);
    grad.addColorStop(1, this.darken(colors.shadow, 1.2));
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    
    for (let i = 0; i < 12; i++) {
      const angle = (this.rotation + i * Math.PI / 6) % (Math.PI * 2);
      const cx = x + Math.cos(angle) * r * 0.6;
      const cy = y + Math.sin(angle) * r * 0.5;
      const craterSize = r * (0.1 + Math.random() * 0.1);
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.arc(cx, cy, craterSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const spec = ctx.createRadialGradient(x - r * 0.4, y - r * 0.4, 0, x, y, r);
    spec.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    spec.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = spec;
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawToxic(ctx, x, y, r) {
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 35;
    
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r * 1.2);
    grad.addColorStop(0, '#ffff66');
    grad.addColorStop(0.5, '#ffd700');
    grad.addColorStop(1, '#ff8c00');
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    
    const spec = ctx.createRadialGradient(x - r * 0.4, y - r * 0.4, 0, x, y, r);
    spec.addColorStop(0, 'rgba(255, 255, 200, 0.5)');
    spec.addColorStop(1, 'rgba(255, 255, 200, 0)');
    ctx.fillStyle = spec;
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawIceGiant(ctx, x, y, r) {
    const colors = this.name === 'Neptune'
      ? { main: '#1e90ff', mid: '#4169e1', dark: '#00008b' }
      : { main: '#40e0d0', mid: '#00ced1', dark: '#008b8b' };
    
    ctx.shadowColor = colors.main;
    ctx.shadowBlur = 35;
    
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r * 1.2);
    grad.addColorStop(0, this.lighten(colors.main, 1.3));
    grad.addColorStop(0.5, colors.main);
    grad.addColorStop(1, this.darken(colors.dark, 1.2));
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    
    const spec = ctx.createRadialGradient(x - r * 0.4, y - r * 0.4, 0, x, y, r);
    spec.addColorStop(0, 'rgba(150, 255, 255, 0.4)');
    spec.addColorStop(1, 'rgba(150, 255, 255, 0)');
    ctx.fillStyle = spec;
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }
  
  draw(ctx) {
    if (this.hidden) return;
    
    const r = this.size;
    
    switch(this.type) {
      case 'earth': this.drawEarth(ctx, this.x, this.y, r); break;
      case 'gasgiant': this.drawGasGiant(ctx, this.x, this.y, r); break;
      case 'rocky': this.drawRocky(ctx, this.x, this.y, r); break;
      case 'toxic': this.drawToxic(ctx, this.x, this.y, r); break;
      case 'icegiant': this.drawIceGiant(ctx, this.x, this.y, r); break;
    }
    
    if (this.hasRings) {
      ctx.strokeStyle = 'rgba(220, 180, 100, 0.6)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, r * 1.8, r * 0.5, this.rotation * 0.4, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(60, 40, 20, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, r * 1.7, r * 0.4, this.rotation * 0.4, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    ctx.shadowBlur = 0;
  }
  
  lighten(hex, factor) {
    const r = Math.min(255, parseInt(hex.slice(1, 3), 16) * factor);
    const g = Math.min(255, parseInt(hex.slice(3, 5), 16) * factor);
    const b = Math.min(255, parseInt(hex.slice(5, 7), 16) * factor);
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }
  
  darken(hex, factor) {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) / factor);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) / factor);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) / factor);
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }
}

function init() {
  state.canvas = document.getElementById('spaceCanvas');
  if (!state.canvas) {
    console.error('Canvas not found');
    return;
  }
  
  state.ctx = state.canvas.getContext('2d', { alpha: true, antialias: true });
  const container = state.canvas.parentElement;
  
  state.canvas.width = container.clientWidth * state.pixelRatio;
  state.canvas.height = container.clientHeight * state.pixelRatio;
  state.canvas.style.width = container.clientWidth + 'px';
  state.canvas.style.height = container.clientHeight + 'px';
  state.ctx.scale(state.pixelRatio, state.pixelRatio);
  
  const w = container.clientWidth;
  const h = container.clientHeight;
  
  PLANETS.forEach(p => {
    const planet = new Planet(p);
    state.planets.push(planet);
    
    if (p.satellites > 0) {
      for (let i = 0; i < p.satellites; i++) {
        state.satellites.push(new Satellite(planet));
      }
    }
  });
  
  for (let i = 0; i < state.starCount; i++) {
    state.stars.push(new Star(w, h));
  }
  
  for (let i = 0; i < 15; i++) {
    state.asteroids.push(new Asteroid());
  }
  
  for (let i = 0; i < 3; i++) {
    state.comets.push(new Comet());
  }
  
  setupSearch();
  setupSliders();
  setupTheme();
  setupColor();
  setupFacts();
  setupPlanetHover();
  setupButtons();
  
  console.log('✨ Full space initialized');
  animate();
}

function setupSearch() {
  const bar = document.getElementById('searchBar');
  if (!bar) return;
  
  bar.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    state.planets.forEach(p => {
      p.hidden = q && !p.name.toLowerCase().includes(q);
    });
  });
}

function setupSliders() {
  const speedSlider = document.getElementById('speedSlider');
  if (speedSlider) {
    speedSlider.addEventListener('change', (e) => {
      state.speed = parseInt(e.target.value);
      document.getElementById('speedText').textContent = e.target.value;
    });
    speedSlider.addEventListener('input', (e) => {
      state.speed = parseInt(e.target.value);
      document.getElementById('speedText').textContent = e.target.value;
    });
  }
  
  const starsSlider = document.getElementById('starsSlider');
  if (starsSlider) {
    starsSlider.addEventListener('change', (e) => {
      const newCount = parseInt(e.target.value);
      document.getElementById('starsText').textContent = newCount;
      
      state.stars = [];
      const container = state.canvas.parentElement;
      for (let i = 0; i < newCount; i++) {
        state.stars.push(new Star(container.clientWidth / state.pixelRatio, container.clientHeight / state.pixelRatio));
      }
    });
    starsSlider.addEventListener('input', (e) => {
      document.getElementById('starsText').textContent = e.target.value;
    });
  }
}

function setupTheme() {
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      btn.textContent = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
    });
  }
}

function setupColor() {
  const cp = document.getElementById('themeColor');
  if (cp) {
    cp.addEventListener('change', (e) => {
      document.querySelectorAll('.info-panel, .planet-info-panel').forEach(panel => {
        panel.style.borderColor = e.target.value;
      });
    });
  }
}

function setupFacts() {
  const el = document.getElementById('currentFact');
  if (!el) return;
  
  const showNextFact = () => {
    state.factIndex = (state.factIndex + 1) % FACTS.length;
    el.textContent = FACTS[state.factIndex];
  };
  
  el.textContent = FACTS[state.factIndex];
  setInterval(showNextFact, 5000);
  el.addEventListener('click', showNextFact);
}

function setupPlanetHover() {
  state.canvas.addEventListener('mousemove', (e) => {
    const rect = state.canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / state.pixelRatio;
    const my = (e.clientY - rect.top) / state.pixelRatio;
    
    let found = null;
    for (let p of state.planets) {
      if (p.hidden) continue;
      const dist = Math.sqrt((mx - p.x) ** 2 + (my - p.y) ** 2);
      if (dist < p.size + 15) {
        found = p;
        break;
      }
    }
    
    if (found && state.selectedPlanet !== found) {
      state.selectedPlanet = found;
      document.getElementById('planetName').textContent = '🌐 ' + found.name;
      document.getElementById('planetDiameter').textContent = `${found.temp} | ${found.gravity}`;
      document.getElementById('planetFact').textContent = found.desc;
      state.canvas.style.cursor = 'pointer';
    } else if (!found && state.selectedPlanet) {
      state.selectedPlanet = null;
      document.getElementById('planetName').textContent = '🌍 Hover a planet';
      document.getElementById('planetFact').textContent = 'Learn amazing facts!';
      state.canvas.style.cursor = 'default';
    }
  });
}

function setupButtons() {
  const screenshotBtn = document.getElementById('screenshotBtn');
  if (screenshotBtn) {
    screenshotBtn.addEventListener('click', () => {
      state.canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `DeepSpace-${new Date().toISOString().slice(0, 19)}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    });
  }
  
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen();
      }
    });
  }
}

function animate() {
  const ctx = state.ctx;
  const c = state.canvas;
  const w = c.width / state.pixelRatio;
  const h = c.height / state.pixelRatio;
  
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#000000');
  bgGrad.addColorStop(0.5, '#0a0a0a');
  bgGrad.addColorStop(1, '#000000');
  
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);
  
  state.time++;
  
  for (let s of state.stars) s.draw(ctx, state.time);
  for (let a of state.asteroids) { a.update(); a.draw(ctx); }
  for (let p of state.planets) { p.update(); p.draw(ctx); }
  for (let sat of state.satellites) { sat.update(); sat.draw(ctx); }
  for (let c of state.comets) { c.update(); c.draw(ctx); }
  
  if (state.time % 20 === 0 && state.meteors.length < 5) {
    state.meteors.push(new Meteor());
  }
  
  state.meteors = state.meteors.filter(m => m.life > 0);
  for (let m of state.meteors) { m.update(); m.draw(ctx); }
  
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  if (state.canvas) {
    const container = state.canvas.parentElement;
    state.canvas.width = container.clientWidth * state.pixelRatio;
    state.canvas.height = container.clientHeight * state.pixelRatio;
    state.ctx.scale(state.pixelRatio, state.pixelRatio);
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
