

function Mic (_fft) {

    var FFT_SIZE = _fft || 1024;
    var BUFF_SIZE = 16384;

    this.vols = [];
    this.volume = 0;

    self = this;

    var self = this;
    var audioContext = new AudioContext();
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

    window.addEventListener('load', init, false);

    function init () {
      try {
        startMic(new AudioContext());
      }
      catch (e) {
        console.error(e);
        alert('Web Audio API is not supported in this browser');
      }
    }


    function startMic (context) {

      navigator.getUserMedia({ audio: true }, processSound, error);

      function processSound (stream) {

        var analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.2;
        analyser.fftSize = FFT_SIZE;

        var node = context.createScriptProcessor(FFT_SIZE*2, 1, 1);

        node.onaudioprocess = function () {
          // bitcount is fftsize / 2
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          self.vols = array;
          this.volume = getRMS(self.vols);
        };

        var input = context.createMediaStreamSource(stream);

        input.connect(analyser);
        analyser.connect(node);
        node.connect(context.destination);

      }

      function error () {
        console.log(arguments);
      }

    }

    //////// SOUND UTILITIES  ////////

    this.mapVol = function(_me, _total){

      if (self.vols.length > 0) {
        var new_me = Math.floor(_me / _total * self.vols.length);
        return self.vols[new_me];
      } else {
        return 0;
      }

    }

    this.splitVol = function(_me, _total){
      if(self.vol.length>0) {
      var new_vol = [];
      var half_length = Math.ceil(self.vols.length / 2);
      var new_vol2 = self.vols.slice(half_length, self.vols.length);
      for (var i = 0; i < half_length; i++) {
        new_vol.push(self.vols[i]);
      }

      for (var i = 0; i < new_vol2.length; i++) {
        new_vol.push(self.vols[i]);
      }

        var new_me = Math.floor(_me / _total * self.vols.length);
        return new_vol[new_me];
      } else {
        return 0;
      }
    }

    //A more accusrate way to get overall volume
    function getRMS(vols) {
          var rms = 0;
          for (var i = 0; i < vols.length; i++) {
            rms += vols[i] * vols[i];
          }
          rms /= vols.length;
          rms = Math.sqrt(rms);
          return rms;
    }

    return this;

  };



var mic = new Mic();
