var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// intialize app settings
app.set('port', (process.env.PORT || 3000));
app.set('mongoURI', (process.env.MONGO_URI || 'mongodb://localhost/lounge'));

// require routes
require('./routes/index.js')(app);
require('./routes/account.js')(app);
require('./routes/event.js')(app);

// initialize db connection
// TODO: Use environment variable
var mongoose = require('mongoose');
var MongoDB = mongoose.connect(app.get('mongoURI')).connection;
MongoDB.on('error', function(err) {
    console.log(err.message);
});
MongoDB.once('open', function() {
    console.log('mongodb connection opened');
});

// initialize middleware for user auth

app.use(express.static('public'));
app.use(cookieParser);
app.use(bodyParser);
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// requires the model with Passport-Local Mongoose plugged in
var User = require('./models/user');

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// start server
app.listen(app.get('port'), function() {
    console.log('server listening on port', app.get('port'));
});
