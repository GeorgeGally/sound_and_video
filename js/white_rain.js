
var MAX = 1500;
var particles = [];

////// PARTICLE STUFF

function updateParticleEngine(){
  // particles updating and drawing
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    update(p);
    render(p);
  }
}

function addParticle(_x, _y, _r, _g, _b){

    var temp_particle = {
      x: _x,
      y: _y,
      startx: _x,
      starty: _y + random(-sample_size/2, sample_size/2),
      speedx: random(-1, 1),
      speedy: random(2, 5),
      sz: 10,
      c: rgb(255)
    }
    particles.push(temp_particle);
    if(particles.length > MAX) particles.splice(0,1);
}


function update(p){
  p.x += p.speedx;
  p.y += p.speedy;
  p.speedy += 0.2;
  if(p.sz > 1) p.sz -= 0.09;

}

function render(p){
  if(p.sz > 1) p.sz -= 0.05;

  ctx.fillStyle = p.c;
  ctx.fillEllipse(p.x, p.y, p.sz, p.sz);
}
