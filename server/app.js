//import node modules
var express = require('express');
var path = require('path');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var app = express();
app.use(express.json())
module.exports = app;
app.set('port', (process.env.PORT || 3000));

var currrentUser;

//MongoDb connection
var url = "mongodb://localhost:27017/mydb";

// static routing - location of static folders
app.use('/CSS', express.static(path.join(__dirname, '../CSS')))
app.use('/scripts', express.static(path.join(__dirname, '../scripts')))
app.use('/samples', express.static(path.join(__dirname, '../samples')))

//Load login.html when '/' is loaded
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../login.html'));
});

app.post('/login', urlencodedParser, function(req, res){
    email = req.body.usn;
    password = req.body.pwd;
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
            db.collection('passwords').find({id:email}).toArray().then((doc) => {
                queriedEmail = doc[0]['id'];
                queriedPass = doc[0]['pass'];

                if(email==queriedEmail && password==queriedPass){
                    client.close();
                    currrentUser = queriedEmail;
                    res.redirect('/app');
                }
                else{
                    client.close();
                    console.log("Incorrect login details");
                    res.sendFile(path.join(__dirname, '../login.html'));
                }
            });
        }
    });
});

app.post('/register', urlencodedParser, function(req,res){
    email = req.body.usn;
    password = req.body.pwd;
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
            db.collection('passwords').insertOne({id:email, pass:password});
            client.close();
            res.sendFile(path.join(__dirname, '../login.html'));
            res.redirect('/');
        }
    });
})

//Load index.html when '/app' is loaded
app.get('/app', function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'));
    console.log(currrentUser);
});

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(500).send(err);
});

app.listen(process.env.PORT || 3000);
//Listen to client request
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
                User: currrentUser,
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
            const data = db.collection('presets').find({'User':currrentUser, 'Name':req.body.name});
            data.forEach(doc => {
                res.send(JSON.stringify(doc));
            });
            console.log("1 document read");
            client.close();
        }
    });
});

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
            db.collection('presets').deleteOne({'User':currrentUser, 'Name':req.body.name});
            console.log("1 document deleted");
            client.close();
        }
    });
});