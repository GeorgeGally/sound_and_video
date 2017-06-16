

//GET CHANGES FROM BACKGROUND
var sensitivity = 20;
var samplesize = 10;
var old = [];
var motion_array = [];

var hidden_ctx = createHiddenCanvas("canvas2");

function motionDetection(_samplesize){

	if (_samplesize == undefined) {
		_samplesize = samplesize;
	}
	motion_array = [];
	hidden_ctx.drawImage(video,0,0,w,h);
	sample = hidden_ctx.getImageData(0,0,w,h);
	var buffer = new Uint32Array(sample.data.buffer);

	for (var y = 0; y < h; y+=_samplesize) {

		for (var x = 0; x < w; x+=_samplesize) {

			var pos = x + y * w;
			var r = buffer[pos] >> 0 & 0xff;
			var g = buffer[pos] >> 8 & 0xff;
			var b = buffer[pos] >> 16 & 0xff;

  			if (Math.abs(r-old[pos]) > sensitivity) {
  				var c = rgb(r,g,b);
  				motion_array.push({x: w - x, y: y, red: r, green: g, blue: b, colour: c});
  			}

  			old[pos] = r;
		}

	}

		return motion_array;
}
