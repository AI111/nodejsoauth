/**
 * Created by sasha on 04.10.15.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var myApi=require("./routes/api")
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(config.mongo.uri);
mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(config.port,config.ip, function(err) {
    if (err) throw err;
    console.log("Server started at port 8080!");
});
app.use('/api/people',myApi);
require('./models/test.data')
require('./routes/index')(app);
require('./routes/people')(app);
app.set('view engine', 'ejs');
app.set('views', './views');