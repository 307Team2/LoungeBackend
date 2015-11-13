var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var url = require('url');

var app = express();

app.use('*', cors({
  origin: process.env.NODE_ENV === 'production' ? 'http://lounge-web.herokuapp.com' : 'http://localhost:8888'
}));

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
app.set('superSecret', 'wubbalubbadubdub');
app.set('mongoURI', (process.env.MONGO_URI || 'mongodb://localhost/lounge'));

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

// initialize redis
var redisUrl;
var redisPassword;
if (typeof process.env.REDISTOGO_URL === 'undefined') {
	redisUrl = url.parse('redis://@127.0.0.1:6380/0');
	redisPassword = 'evanlounge';
} else {
	redisUrl = url.parse(process.env.REDISTOGO_URL);
	// this will be set later by the external redis service we use
	redisPassword = process.env.REDISTOGO_PASS;
}

var redisHost = redisUrl.hostname;
var redisPort = redisUrl.port;

// initialize middleware for user auth
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ 
	resave: false,
	store: new RedisStore({
		host: redisHost,
		port: redisPort,
		pass: redisPassword
	}),
	saveUninitialized: false,
	secret: 'lounge-secret'
}));
app.use(passport.initialize());
app.use(passport.session());

// requires the model with Passport-Local Mongoose plugged in
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

// use static serialize and deserialize of model for passport session support
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// require routes
require('./routes/index.js')(app);
require('./routes/account.js')(app);
require('./routes/events.js')(app);
require('./routes/post.js')(app);
require('./routes/profile.js')(app);

// start server
app.listen(app.get('port'), function() {
    console.log('server listening on port', app.get('port'));
});
