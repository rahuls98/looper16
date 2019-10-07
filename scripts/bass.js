// mess with this! don't use the same one
var bassSynth = new Tone.Synth({
    "volume": 2,
    oscillator : {
        type : "square"
    } ,
    envelope : {
        attack : 0.46,
        decay : 1.17,
        sustain : 0.15,
        release : 2.84
    }
}).toMaster();

var bassGain = new Tone.Volume(1);
bassSynth.chain(bassGain, Tone.Master);

//C3 -> C4
var bassNotes = [261.6256,246.9417,233.0819,220.0000,207.6523,195.9977,184.9972,174.6141,164.8138,155.5635,146.8324,,138.5913,130.8128]

function triggerBass(bassMatrix, time, col) {
    var column = bassMatrix.matrix[col];
    for (var i = 0; i < column.length; i++) {
      if (column[i] === 1){
        bassSynth.triggerAttackRelease(bassNotes[i], "16n", time)
      }
    }
    bassMatrix.place = col;
}
