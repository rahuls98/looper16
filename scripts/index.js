var AudioContext = window.AudioContext || window.webkitAudioContext;

//Global tempo
Tone.Transport.bpm.value = 100;

//Load Nexus UI elements
nx.onload = function() {
    //Set accent and fill colors
    [drumMatrix, drumVolume, synthMatrix, synthVol, 
        bassMatrix, bassVol, start, stop, tempo].forEach(element => { 
        element.colors.accent = "#e33d48",
        element.colors.fill = "#333"
    });

    drumMatrix.col = 16;
    drumMatrix.row = 3;

    [synthMatrix, bassMatrix].forEach(element => { 
        element.col = 16,
        element.row = 13
    });

    drumMatrix.init();
    synthMatrix.init();
    bassMatrix.init();

    drumVolume.setNumberOfSliders(3);
    drumVolume.init();
    synthVol.init();
    bassVol.init();

    start.init();
    stop.init();
    tempo.init();
}

//Start button event listener
document.getElementById('start').addEventListener('click', function() {
    var context = new AudioContext();
    Tone.context.resume();
    Tone.Transport.start();
    loop.start();
});

//Stop button event listener
document.getElementById('stop').addEventListener('click', function() {
    Tone.Transport.stop();
    [synthMatrix, bassMatrix].forEach(matrix => matrix.stop())
});

//Save button event listener
document.getElementById('save').addEventListener('click', function() {
    const save = {
        drumMatrix: drumMatrix.matrix,
        synthMatrix: synthMatrix.matrix,
        bassMatrix: bassMatrix.matrix
    }
    window.localStorage['savefile'] = JSON.stringify(save);
});

//Load button event listener
document.getElementById('load').addEventListener('click', function() {
    const save = JSON.parse(window.localStorage['savefile']);
    drumMatrix.matrix = save.drumMatrix;
    bassMatrix.matrix = save.bassMatrix;
    synthMatrix.matrix = save.synthMatrix;
    [drumMatrix, synthMatrix, bassMatrix].forEach(matrix => matrix.init())
});
