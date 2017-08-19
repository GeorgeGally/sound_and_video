

function Mic (_fft) {

    var FFT_SIZE = _fft || 1024;

    var self = this;
    self.spectrum = new Uint8Array(FFT_SIZE/2);
    self.volume = self.vol = 0;
    self.peak_volume = 20;

    var audioContext = new AudioContext();
    var SAMPLE_RATE = audioContext.sampleRate;
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

        // analyser extracts frequency, waveform, and other data
        var analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.2;
        analyser.fftSize = FFT_SIZE;

        var node = context.createScriptProcessor(FFT_SIZE*2, 1, 1);

        node.onaudioprocess = function () {
          // bitcount returns array which is half the FFT_SIZE
          self.spectrum = new Uint8Array(analyser.frequencyBinCount);

          // getByteFrequencyData returns the amplitude for each frequency
          analyser.getByteFrequencyData(self.spectrum);
          // getByteTimeDomainData gets volumes over the sample time
          //analyser.getByteTimeDomainData(dataArray);
          self.vol = self.getRMS(self.spectrum);
          // get peak
          if (self.vol > self.peak_volume) self.peak_volume = self.vol;
          self.volume = self.vol;
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

    this.mapSound = function(_me, _total, _min, _max){

      if (self.spectrum.length > 0) {
        return this.mapSpectrum(self.spectrum, _me, _total, _min, _max)
      } else {
        return 0;
      }

    }

    this.mapSpectrum = function(_freqs, _me, _total, _min, _max){
      var min = _min || 0;
        var max = _max || 100;
        //actual new freq
        var new_freq = Math.round(_me /_total * _freqs.length);

        //console.log(Math.round(self.peak_volume) + " : " + Math.round(self.spectrum[new_freq]));
        // map the volumes to a useful number
        var s = map(_freqs[new_freq], 0, self.peak_volume, min, max);
        //console.log(s);
        return s || 0;
    }


    this.getVol = function(_max){

      var max = _max || 100;

      // map total volume to 100 for convenience
      self.volume = map(self.vol, 0, self.peak_volume, 0, max);
      return self.volume;
    }

    this.getVolume = function(_max) { return this.getVol(_max);}

    //A more accurate way to get overall volume
    this.getRMS = function (spectrum) {

          var rms = 0;
          for (var i = 0; i < spectrum.length; i++) {
            rms += spectrum[i] * spectrum[i];
          }
          rms /= spectrum.length;
          rms = Math.sqrt(rms);
          return rms;
    }

    //freq = n * SAMPLE_RATE / MY_FFT_SIZE
    function mapFreq(i){
      // var freq = i * SAMPLE_RATE / FFT_SIZE;
      var freq = i * SAMPLE_RATE / self.spectrum.length;
      return freq;
    }

  // getMix function. Computes the current frequency with
  // computeFreqFromFFT, then returns bass, mids and his
  // sub bass : 0 > 100hz
  // mid bass : 80 > 500hz
  // mid range: 400 > 2000hz
  // upper mid: 1000 > 6000hz
  // high freq: 4000 > 12000hz
  // Very high freq: 10000 > 20000hz and above

  this.getMix = function(){
    var highs = [];
    var mids = [];
    var bass = [];
    var bass = [];
    for (var i = 0; i < self.spectrum.length; i++) {
      var band = mapFreq(i);
      var v = map(self.spectrum[i], 0, self.peak_volume, 0, 100);
      if (band < 500) {
        bass.push(v);
      }
      if (band > 400 && band < 6000) {
          mids.push(v);
      }
      if (band > 4000) {
          highs.push(v);
      }
    }
    return {bass: bass, mids: mids, highs: highs}
  }


  this.getBass = function(){
          return this.getMix().bass;
    }

  this.getMids = function(){
        return this.getMix().mids;
  }

  this.getHighs = function(){
        return this.getMix().highs;
  }

  this.getHighsVol = function(_min, _max){
    var min = _min || 0;
    var max = _max || 100;
    var v = map(this.getRMS(this.getMix().highs), 0, self.peak_volume, min, max);
    return v;
  }

  this.getMidsVol = function(_min, _max){
    var min = _min || 0;
    var max = _max || 100;
    var v = map(this.getRMS(this.getMix().mids), 0, self.peak_volume, min, max);
    return v;
  }

  this.getBassVol = function(_min, _max){
    var min = _min || 0;
    var max = _max || 100;
    var v = map(this.getRMS(this.getMix().bass), 0, self.peak_volume, min, max);
    return v;
  }


  this.mapBass = function(){
        return this.mapSpectrum(this.getMix().bass, _me, _total, _min, _max);
    }

  this.mapMids = function(){
        return this.mapSpectrum(this.getMix().mids, _me, _total, _min, _max);
  }

  this.mapHighs = function(){
        return this.mapSpectrum(this.getMix().highs, _me, _total, _min, _max);
  }



  return this;

  };



var Mic = new Mic();
console.log(Mic);
