/**
 * Created by sasha on 04.10.15.
 */
var express = require('express');
var mongoose = require('mongoose');
var myApi = require("./server/routes/api")
var bodyParser = require('body-parser');
var config = require('./server/config');
var morgan  = require('morgan');
var passport = require('passport');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var flash    = require('connect-flash');
var favicon = require('serve-favicon');
var app = express();
var methodOverride = require('method-override');
var server = require('http').createServer(app);
var mongoStore = require('connect-mongo')(session);

mongoose.connect(config.mongo.connection_string);
mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride());
app.use(cookieParser());
app.use(passport.initialize());
// Persist sessions with mongoStore
// We need to enable sessions for passport twitter because its an oauth 1.0 strategy
app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        db: 'nodejsoauth'
    })
}));
app.use(flash());
server.listen(config.port,config.ip, function(err) {
    if (err) throw err;
    console.log("Server started")
    console.log('http://'+(config.ip||'localhost')+':'+config.port);
});



require('./routes')(app);
require('./server/api/initial.data');

//app.use('/auth', require('./server/auth'));
app.set('view engine', 'ejs');
app.set('views', './views');

var socketio = require('socket.io')(server);
require('./server/socket')(socketio);