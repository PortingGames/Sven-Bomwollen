Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
    }
		

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}