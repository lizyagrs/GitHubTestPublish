// server.js

//引入我们需要的各种模块======================================================================
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 3500;

var passport = require('passport');
var flash    = require('connect-flash');


var path = require('path')

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


app.set('views', __dirname +'/views');
app.set('view engine', 'ejs');// set up ejs for templating
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session




//设置路由
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport



// launch ======================================================================
app.listen(port);

//终端打印如下信息
console.log('The magic happens on port ' + port);
