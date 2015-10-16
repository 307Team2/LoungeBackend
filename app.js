var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var account = require('./routes/account');
var feed = require('./routes/feed');

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

app.use('/', routes);
app.use('/account/', account);
app.use('/feed/', feed);

// intialize app settings
app.set('port', (process.env.PORT || 3000));
app.set('mongoURI', (process.env.MONGO_URI || 'mongodb://localhost/test'));

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

// start server
app.listen(app.get('port'), function() {
    console.log('server listening on port', app.get('port'));
});
