var AudioContext = window.AudioContext || window.webkitAudioContext;

//Global tempo
Tone.Transport.bpm.value = 80;

//Load Nexus UI elements
nx.onload = function() {
    //Set accent and fill colors
    [drumMatrix, drumVol, synthMatrix, synthVol, 
        bassMatrix, bassVol, start, stop, tempo, save, load, del, clear].forEach(element => { 
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
    del.init();
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
    var presetName = prompt("Please enter preset name: ");
    const preset = {
        name: presetName,
        drumMatrix: drumMatrix.matrix,
        synthMatrix: synthMatrix.matrix,
        bassMatrix: bassMatrix.matrix
    }
    fetch('/dbInsert', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(preset),
    })
    .then(function(response){
        if(response.ok){
            console.log('Request success: ', response);
            return;
        }
        throw new Error('Request failed.');
    })
    .catch(function(error) {
        console.log(error);
    });
});

//Load button event listener
document.getElementById('load').addEventListener('click', function() {
    var presetName = prompt("Please enter preset name: ");
    fetch('/dbRead', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: presetName}),
    })
    .then(function(response){
        if(response.ok){
            response.text().then((s) => {
                const pattern = JSON.parse(s);
                drumMatrix.matrix = pattern.Drum;
                synthMatrix.matrix = pattern.Synth;
                bassMatrix.matrix = pattern.Bass;
                [drumMatrix, synthMatrix, bassMatrix].forEach(matrix => matrix.init())
            });
            return;
        }
        throw new Error('Request failed.');
    })
    .catch(function(error) {
        console.log(error);
    });
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
document.getElementById('del').addEventListener('click', function() {
    var presetName = prompt("Please enter preset name: ");
    fetch('/dbRemove', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: presetName}),
    })
    .then(function(response){
        if(response.ok){
            console.log('Request success: ', response);
            return;
        }
        throw new Error('Request failed.');
    })
    .catch(function(error) {
        console.log(error);
    });
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