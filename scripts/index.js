var AudioContext = window.AudioContext || window.webkitAudioContext;

//Global tempo
Tone.Transport.bpm.value = 80;

//Load Nexus UI elements
nx.onload = function() {
    //Set accent and fill colors
    [drumMatrix, drumVol, synthMatrix, synthVol, 
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

    drumVol.setNumberOfSliders(3);
    drumVol.init();
    drumVol.setSliderValue(0,0.5);
    drumVol.setSliderValue(1,0.5);
    drumVol.setSliderValue(2,0.5);

    synthVol.val.value = -10;
    synthVol.init();
    bassVol.val.value = -10;
    bassVol.init();

    start.init();
    stop.init();
    tempo.val.value = 80;
    tempo.init();
    save.init();
    load.init();
    reset.init();
    clear.init();
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
    window.localStorage['pattern'] = JSON.stringify(save);
});

//Load button event listener
document.getElementById('load').addEventListener('click', function() {
    const save = JSON.parse(window.localStorage['pattern']);
    drumMatrix.matrix = save.drumMatrix;
    bassMatrix.matrix = save.bassMatrix;
    synthMatrix.matrix = save.synthMatrix;
    [drumMatrix, synthMatrix, bassMatrix].forEach(matrix => matrix.init())
});

//Clear button event listener to clear grid pattern
document.getElementById('clear').addEventListener('click', function() {
    const grid_reset = emptyMatrix;
    drumMatrix.matrix = grid_reset.drumMatrix;
    bassMatrix.matrix = grid_reset.bassMatrix;
    synthMatrix.matrix = grid_reset.synthMatrix;
    [drumMatrix, synthMatrix, bassMatrix].forEach(matrix => matrix.init())
});


//Reset button event listener to reset local storage memory
document.getElementById('reset').addEventListener('click', function() {
    delete localStorage['pattern'];
});

//Tempo dial event listener
document.getElementById('tempo').addEventListener('mousedown',function(){
    tempo.on('*',function(){
        Tone.Transport.bpm.value = tempo.val.value;
    })
});

//Drum volume multislider event listener
document.getElementById('drumVol').addEventListener('mousedown',function(){
    drumVol.on('*',function(){
        hihat.volume.value = (40*drumVol.val[0])-20;
        snare.volume.value = (40*drumVol.val[1])-20;
        kick.volume.value = (40*drumVol.val[2])-20;
    })
});

//Synth volume dial event listener
document.getElementById('synthVol').addEventListener('mousedown',function(){
    synthVol.on('*',function(){
        synth.volume.value = synthVol.val.value;
    })
});

//Bass volume dial event listener
document.getElementById('bassVol').addEventListener('mousedown',function(){
    bassVol.on('*',function(){
        bassSynth.volume.value = bassVol.val.value;
    })
});