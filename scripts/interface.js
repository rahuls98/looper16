Nexus.colors.accent = "#e33d48"
Nexus.colors.fill = "#333"

//DRUM GRID
var drum_seq = new Nexus.Sequencer('#drum-seq',{
    'size': [850,150],
    'mode': 'toggle',
    'rows': 3,
    'columns': 16
});

//DRUM VOLUME
var drum_vol = new Nexus.Multislider('#drum-vol',{
    'size': [200,150],
    'numberOfSliders': 3,
    'min': 0,
    'max': 1,
    'step': 0,
    'candycane': 4,
    'values': [0.7, 0.3, 0.5],
    'smoothing': 0,
    'mode': 'bar'  // 'bar' or 'line'
});

//PIANO GRID
var piano_seq = new Nexus.Sequencer('#piano-seq',{
    'size': [850,250],
    'mode': 'toggle',
    'rows': 13,
    'columns': 16
});

//PIANO VOLUME
var piano_vol = new Nexus.Dial('#piano-vol',{
    'size': [150,150],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 0,
    'max': 1,
    'step': 0,
    'value': 0.25
});

//BASS VOLUME
var bass_vol = new Nexus.Dial('#bass-vol',{
    'size': [150,150],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 0,
    'max': 1,
    'step': 0,
    'value': 0.25
});

//BASS GRID
var bass_seq = new Nexus.Sequencer('#bass-seq',{
    'size': [850,250],
    'mode': 'toggle',
    'rows': 13,
    'columns': 16
});

//PLAY BUTTON
var play_btn = new Nexus.Button('#play-button',{
    'size': [80,80],
    'mode': 'aftertouch',
    'state': false
});

//STOP BUTTON
var stop_btn = new Nexus.Button('#stop-button',{
    'size': [80,80],
    'mode': 'aftertouch',
    'state': false
});

//TEMPO
var tempo = new Nexus.Number('#tempo',{
    'size': [60,30],
    'value': 80,
    'min': 0,
    'max': 20000,
    'step': 1
});
tempo.colorize("fill","white");