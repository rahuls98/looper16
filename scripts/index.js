var AudioContext = window.AudioContext || window.webkitAudioContext;

Tone.Transport.bpm.value = 100;

nx.onload = function() {
    drumMatrix.col = 16;
    drumMatrix.row = 3;
    drumMatrix.colors.accent = "#e33d48";
    drumMatrix.colors.fill = "#333";
    drumMatrix.init();

    synthMatrix.col = 16;
    synthMatrix.row = 13;
    synthMatrix.colors.accent = "#e33d48";
    synthMatrix.colors.fill = "#333";
    synthMatrix.init();

    bassMatrix.col = 16;
    bassMatrix.row = 13;
    bassMatrix.colors.accent = "#e33d48";
    bassMatrix.colors.fill = "#333";
    bassMatrix.init();

    drumVolume.colors.accent = "#e33d48";
    drumVolume.colors.fill = "#333";
    drumVolume.setNumberOfSliders(3)
    var DV = document.getElementById('drumVolume');
    var context = DV.getContext('2d');
    context.font = '20pt Calibri';
    context.fillStyle = 'blue';
    context.fillText('Drum Volume', 150, 100);
    drumVolume.init();

    synthVol.colors.accent = "#e33d48";
    synthVol.colors.fill = "#333";
    synthVol.init();
    bassVol.colors.accent = "#e33d48";
    bassVol.colors.fill = "#333";
    bassVol.init();

    start.colors.accent = "#e33d48";
    start.colors.fill = "#333";
    start.init();
    stop.colors.accent = "#e33d48";
    stop.colors.fill = "#333";
    stop.init();

    tempo.colors.accent = "#e33d48";
    tempo.colors.fill = "#333";
    tempo.init();
}

document.getElementById('start').addEventListener('click', function() {
    var context = new AudioContext();
    Tone.context.resume();
    Tone.Transport.start();
    loop.start();
});

document.getElementById('stop').addEventListener('click', function() {
    Tone.Transport.stop();
    synthMatrix.stop();
});