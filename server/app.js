//import node modules
var express = require('express');
var path = require('path');
const MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(express.json())
module.exports = app;
app.set('port', (process.env.PORT || 3000));

//MongoDb connection
var url = "mongodb://localhost:27017/mydb";

// static routing - location of static folders
app.use('/CSS', express.static(path.join(__dirname, '../CSS')))
app.use('/scripts', express.static(path.join(__dirname, '../scripts')))
app.use('/samples', express.static(path.join(__dirname, '../samples')))

//Load index.html when '/' is loaded
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(500).send(err);
});

app.listen(process.env.PORT || 3000)
//Listen to client POST request to insert preset
app.post('/dbInsert', (req, res) => {
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, client) => {
        if (err) {
            console.error(err);
            return;
        }
        else {
            const db = client.db('looper16');
            const coll = db.collection('presets');
            //insert object
            var myobj = { 
                Name: req.body.name, 
                Drum: req.body.drumMatrix, 
                Synth: req.body.synthMatrix, 
                Bass: req.body.bassMatrix
            };
            coll.insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                client.close();
            });
        }
    });
});

//Listen to client POST request to load preset
app.post('/dbRead', (req, res, next) => {
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, client) => {
        if (err) {
            console.error(err);
            return;
        }
        else {
            const db = client.db('looper16');
            const data = db.collection('presets').find({'Name':req.body.name});
            data.forEach(doc => {
                res.send(JSON.stringify(doc));
            });
            console.log("1 document read");
            client.close();
        }
    });
});

//Listen to client POST request to remove preset
app.post('/dbRemove', (req, res, next) => {
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, client) => {
        if (err) {
            console.error(err);
            return;
        }
        else {
            const db = client.db('looper16');
            db.collection('presets').deleteOne({'Name':req.body.name});
            console.log("1 document deleted");
            client.close();
        }
    });
});