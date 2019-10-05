// creates synth instrument
var synth = new Tone.Synth().toMaster();

// C4->C5
var synthNotes = [523.2511,493.8833,466.1638,440.0000,415.3047,391.9954,369.9944,349.2282,329.6276,311.1270,293.6648,277.1826,261.6256]

function triggerSynth(synthMatrix, time, col) {
    var column = synthMatrix.matrix[col];
    for (var i = 0; i < column.length; i++) {
      if (column[i] === 1){
        synth.triggerAttackRelease(synthNotes[i], "8n", time) //8n - duration of note
      }
    }
    synthMatrix.place = col;
}