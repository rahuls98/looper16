var express = require('express'),
    app = express(),
    path = require('path');
	module.exports = app;

// static routing
app.use('/CSS', express.static(path.join(__dirname, '../CSS')))
app.use('/scripts', express.static(path.join(__dirname, '../scripts')))
app.use('/samples', express.static(path.join(__dirname, '../samples')))

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(500).send(err);
});

app.listen(process.env.PORT || 3000)