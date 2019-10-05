Tone.Transport.bpm.value = 80;

var drums = new Tone.Players({
    hihat : "hihat.wav",
    kick : "../samples/kick.wav",
    snare : "../samples/snare.wav",
    volume : 2,
    fadeOut : 0.1
}).toMaster();

function triggerDrums(drumMatrix, time, col) {
    var column = drumMatrix.matrix[col];
    for (var i = 0; i < column.length; i++) {
      if (column[0] === 1) {
        drums.get('hihat').start('now', 0, time);
      }
      if (column[1] === 1) {
        drums.get('kick').start('now', 0, time);
      }
      if (column[2] === 1) {
        drums.get('snare').start('now', 0, time);
      }
    }
    drumMatrix.place = col;
}