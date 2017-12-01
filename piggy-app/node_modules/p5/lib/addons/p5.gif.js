(function (root, factory) {
  console.log(exports);
  if (typeof define === 'function' && define.amd)
    define('p5.gif', ['p5', 'SuperGif'], function (p5, SuperGif) { (factory(p5, SuperGif));});
  else if (typeof exports === 'object')
    factory(require('../p5'), require('./supergif'));
  else
    factory(root['p5'], root['SuperGif']);
}(this, function (p5, SuperGif) {
  console.log(SuperGif);

  p5.prototype.loadGif = function(url, cb) {
    var gif = new SuperGif({
      gif: url,
      p5inst: this
    });

    gif.load(cb);

    var p5graphic = gif.buffer();

    p5graphic.play = gif.play;
    p5graphic.pause = gif.pause;
    p5graphic.playing = gif.get_playing;
    p5graphic.frames = gif.get_frames;
    p5graphic.totalFrames = gif.get_length;

    p5graphic.loaded = function() {
      return !gif.get_loading();
    };

    p5graphic.frame = function(num) {
      if (typeof num === 'number') {
        gif.move_to(num);
      } else {
        return gif.get_current_frame();
      }
    };

    return p5graphic;
  };

  p5.prototype.loadRawGif = function(data, cb) {
    var gif = new SuperGif({
      gif: '',
      p5inst: this
    });

    gif.load_raw(data, cb);

    var p5graphic = gif.buffer();
    p5graphic.play = gif.play;
    p5graphic.pause = gif.pause;
    p5graphic.playing = gif.get_playing;
    p5graphic.frames = gif.get_frames;
    p5graphic.totalFrames = gif.get_length;

    p5graphic.loaded = function() {
      return !gif.get_loading();
    };

    p5graphic.frame = function(num) {
      if (typeof num === 'number') {
        gif.move_to(num);
      } else {
        return gif.get_current_frame();
      }
    };

    return p5graphic;
  };

}));
