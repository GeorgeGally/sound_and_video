var sample_size = 20;
var sensitivity = 50;
var saved_red = [];

function sampleColours(){

  ctx2.drawImage(video, 0, 0, w, h);
  var sample = ctx2.getImageData(0, 0, w, h).data;

  for (var y = 0; y < h; y+=sample_size) {
    for (var x = 0; x < w; x+=sample_size) {

      var pos = (x + y * w) * 4;
      var red = sample[pos];
      var green = sample[pos+1];
      var blue = sample[pos+2];

      // CHECK IF DIFFERENCE BETWEEN SAVED RED AND CURRENT
      if (Math.abs(saved_red[pos] - red) > sensitivity) {
        addParticle(x, y, red, green, blue);
      }

      //saved_red[pos] = red;
    }
  }
}


/// MOUSE PRESS SAMPLE background
document.onmousedown = function() {
  sampleVideo();
}

function sampleVideo(){
  console.log("sampleVideo");
  ctx2.drawImage(video, 0, 0, w, h);
  var sample = ctx2.getImageData(0, 0, w, h).data;

  for (var y = 0; y < h; y+=sample_size) {
    for (var x = 0; x < w; x+=sample_size) {

      var pos = (x + y * w) * 4;
      var red = sample[pos];
      saved_red[pos] = red;
      //console.log(saved_red[pos]);
    }
  }
}
