
function MotionDetect(_resolution, _sensitivity){

	this.resolution = _resolution || 10;
	this.sensitivity = _sensitivity || 30;

	var old = [];
	var motion_array = [];
	var first_time = 1;
	var hidden_ctx = createHiddenCanvas("canvas2");

	this.detect = function(){

		motion_array = [];
		hidden_ctx.drawImage(video,0,0,w,h);
		sample = hidden_ctx.getImageData(0,0,w,h);
	var buffer = new Uint32Array(sample.data.buffer);

	for (var y = 0; y < h; y += this.resolution) {

		for (var x = 0; x < w; x += this.resolution) {

			var pos = x + y * w;
			var r = buffer[pos] >> 0 & 0xff;
			var g = buffer[pos] >> 8 & 0xff;
			var b = buffer[pos] >> 16 & 0xff;

  		if (Math.abs(r-old[pos]) > this.sensitivity) {
  				var c = rgb(r,g,b);
  				motion_array.push({x: x, y: y, red: r, green: g, blue: b, colour: c});
  		}

  		old[pos] = r;
		}

	}
		// test to see if first time
		if(first_time) {
			first_time = 0;
			return [];
		} else {
			return motion_array;
		}

}

}

var Motion = new MotionDetect();
