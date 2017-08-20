
var MAX = 2500;
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

function addParticle(_x, _y){
  //console.log(_y);
    var temp_particle = {
      x: random(w),
      y: random(h),
      targetx: _x,
      targety: _y,
      speedx: 0,
      speedy: random(-5, -2),
      sz: 20,
      c: rgb(255)
    }
    particles.push(temp_particle);
    if(particles.length > MAX) particles.splice(0,1);
}


function update(p){
  p.x = tween(p.x, p.targetx, 20);
  p.y = tween(p.y, p.targety, 20);

  // p.targetx += random(-0.2, 0.2);
  // p.targety += random(-0.2, 0.2);
  //p.speedy += 0.6;
  //if(p.sz > 1) p.sz -= 0.09;

}

function render(p){
  ctx.lineWidth = 0.5;
  ctx.fillStyle = p.c;
  ctx.fillEllipse(p.x, p.y, 4, 4);
  ctx.strokeStyle = p.c;
  ctx.strokeEllipse(p.x, p.y, p.sz, p.sz);
}
