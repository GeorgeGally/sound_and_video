var particleEngine = function(_num_particles, _grid){

	this.bounce = false;
	this.particles = [];
	this.spacing = 0;
	this.speed_max_x = 1;
	this.speed_max_y = 2;
	this.randomize_x = 0;
	this.randomize_y = 0;

	this.life = 0.98;
	this.length = 0;
	this.pos = new Vector();
	this.last = [];
	this.start_size = 5;
	this.setup = function() {

	for (var i = 0; i < _num_particles; i++) {

	  var m = map(i, 0, _num_particles, 0, 360);
	  var cc = hsl(m, 96, 60);

		if (_grid != undefined) {
			// hack for old grid
			if(_grid[i] != undefined){
				this.addParticle(_grid[i].x, _grid[i].y, cc, i);
			} else {
				this.addParticle(_grid.x[i], _grid.y[i], cc, i);
			}

		} else {
			this.addParticle(w/2, h/2, cc, i);
		}

	}

	}

	this.draw = function() {
		this.moveParticles();
		//this.drawParticles();
	}


this.addParticle = function(_x, _y, _colour, _me){

		_x = _x || w/2;
		_y = _y || h/2;
		_colour = _colour || "black";
		_me = _me || this.particles.length;

		var particle = {
				position: new Vector(_x + random(-1 * this.randomize_x, this.randomize_x), _y + random(-1 * this.randomize_y, this.randomize_y)),
				pos: new Vector(_x + random(- 1 * this.randomize_x, this.randomize_x), _y + random(-1 * this.randomize_y, this.randomize_y)),
				target: new Vector(_x, _y),
				old: new Vector(_x, _y),
				start: new Vector(_x, _y),
				end: new Vector(_x, _y),
				location: new Vector(_x, _y),
				orig_position: new Vector(_x, _y),
				speed: new Vector(posNeg()*random(0.1, this.speed_max_x), posNeg()*random(0.2,this.speed_max_y)),
				acceleration: new Vector(0,0),
				c: _colour,
				alpha: 1,
				me: _me,
				//parent: null,
				r: 0,
				sz: this.start_size,
				size: this.start_size,
				on: true,
				isSpring: false,
				spring: 0.03,
				friction: 0.98,
				angle: radians((2.2*_me)%360)
	}

	this.particles.push(particle);
	this.last = particle;
	this.length = this.particles.length;
	this.spacing = 360/this.particles.length;
	if (this.particles.length > this.max_particles) {
		this.removeParticle(0);
	}
	return particle;
}

this.removeParticle = function(_me){
	if (_me === undefined) {
		_me = 0;
	}
	//console.log(_me);
	this.particles.splice(_me, 1);
	this.length = this.particles.length;
	for (var i = 0; i < this.length; i++) {
		var p = this.particles[i];
		p.me = i;
	}
	this.spacing = 360/this.particles.length;

}

this.moveParticles = function(){

	for (var i = 0; i < this.particles.length; i++) {

		p = this.particles[i];

		p.old = p.position;
		p.position = p.position.add(p.speed);
		p.sz *= this.life;
		p.pos = p.position;

	};
	this.checkForRemoval();
}


this.drawParticles = function(){

	for (var i = 0; i < this.particles.length; i++) {

		p = this.particles[i];
		ctx.fillStyle = p.c;
		ctx.fillEllipse(p.pos.x, p.pos.y, p.sz, p.sz);
	}

}

this.checkForRemoval = function(){
	for (var i = 0; i < this.particles.length; i++) {
		var p = this.particles[i];
		if (p.pos.x > w  || p.pos.x < 0 || p.pos.y > h || p.pos.y < 0 || p.sz < 0.1 || p.sz> 120) {
		this.removeParticle(i);
	}
	}
}


this.getEnd = function(b){
	parent = b.parent;
	angle = b.angle;
	while(parent) {
		angle += parent.angle;
	//if(b.parent != undefined) { b.angle += parent.angle; }
		//if(b.parent != undefined)
		parent = parent.parent;
	}
	var x = b.pos.x + Math.cos(angle) * b.size;
	var y = b.pos.y + Math.sin(angle) * b.size;
	b.end = new Vector(x,y)
	return b.end;
}

function update(b) {

	 var dx = b.target.x - b.pos.x;
	 var dy = b.target.y - b.pos.y;
	 var ax = dx * b.spring;
	 var ay = dy * b.spring;
	 b.speed.x += ax;
	 b.speed.y += ay;
	 //We build in some friction here, otherwise the ball
	 //will keep on moving to and fro for ever.
	 b.speed.x *= b.friction;
	 b.speed.y *= b.friction;
	 b.pos.x +=  b.speed.x;
	 b.pos.y +=  b.speed.y;
}

this.moveToTarget = function(){

	for (var i = 0; i < this.particles.length; i++) {

		p = this.particles[i];
		p.old = p.position;
		p.position.x = tween(p.position.x, p.target.x, p.speed.x);
		p.position.y = tween(p.position.y, p.target.y, p.speed.x);
		if (p.position.x > w) p.position.x = 0;
		if (p.position.y > h) p.position.y = 0;
		if (p.position.x < 0) p.position.x = w;
		if (p.position.y < 0) p.position.y =h;
		p.pos = p.position;
	};

}

this.setup();

}
