var express = require('express')
var app = express();

//var router = express.Router();

var db = require('../server/db');


//module.exports = router;





// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs');// load the index.ejs file
	});
	
	//req request获取信息
	//res response浏览器返回响应信息

//	app.get('/',function(req,textfid){
//		var fid = req.body.fid;
//  	if(fid){
// 			res.render("/textfid",{fid:fid});
//   	}
//	});


	app.get('/textfid',db.textfid);
	app.get('/suoyou', db.getAllPlayers);
	app.get('/players', db.getAllPlayers);
	app.get('/dandian/:id', db.getSinglePlayer);
	app.post('/players', db.createPlayer);
	app.put('/players/:id', db.updatePlayer);
	app.delete('/players/:id', db.deletePlayer);




	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index.ejs', { message: req.flash('loginMessage') });
	});
	
	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// ========================= ============
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('index.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.use(express.static(__dirname + '/public'));
};



// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	//如果用户在会话中进行了身份验证，请继续
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	//如果他们没有将他们重定向到主页
	res.redirect('/');
}
