// dependecies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('./socket').listen(http);
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 


// port number
var port = 8080;

mongoose.connect('mongodb://127.0.0.1/messagelnk');

app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());


// Routes
var index = require('./routes/index').socket(io, express);

// routes
app.use('/', index);


http.listen(port, function() {
	console.log("Listening");
});