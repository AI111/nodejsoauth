/**
 * Created by sasha on 04.10.15.
 */
var express = require('express');
var mongoose = require('mongoose');
var myApi = require("./routes/api")
var bodyParser = require('body-parser');
var config = require('./config');
var morgan  = require('morgan');
var passport = require('passport');
var session  = require('express-session');
var flash    = require('connect-flash');

var app = express();

mongoose.connect(config.mongo.connection_string);
mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.listen(config.port,config.ip, function(err) {
    if (err) throw err;
    console.log("Server started at port 8080!");
});

require('./oauth/passport')(passport); // pass passport for configuration

app.use('/api/people',myApi);
//require('./models/test.data')
require('./routes/index')(app,passport);
require('./routes/people')(app);
app.set('view engine', 'ejs');
app.set('views', './views');