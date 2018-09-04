// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
// load up the user model
var bcrypt = require('bcrypt-nodejs');
// load up the user model
const pg = require('pg');
//var bcrypt = require('bcrypt-nodejs');

var config = {
  user: 'postgres', //env var: PGUSER
	password: '313616', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  database: 'user', //env var: PGDATABASE
  //max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

//创建连接池
const pool = new pg.Pool(config);


module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
    //debug met vcl kkk

    // =========================================================================
    // LOCAL SIGNUP 用户注册=====================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            //copy ca dong nay vao trong project, roi edit cac file html lai.  sau do dung bt lka duoc con luot view n buaye
            //bye bye. m lam dc view chua
            pool.query("SELECT * FROM user_table WHERE username = '" + username + "'", function(err, rows) {
                if (err)
                    return done(err);
                if (rows.rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };

                    //var insertQuery = ;

                    pool.query("INSERT INTO user_table ( username, password ) values ('"+ newUserMysql.username+"','"+newUserMysql.password+"')",function(err, rows) {
                      //console.log();
                        newUserMysql.id = rows.result;
                        //done(err);
                        return done(null, newUserMysql);
                    });

                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN 用户登录======================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
          //use the client for executing the query
          //loi query o day, len pgadmin de check xem cu phap
          //ma hash: $2a$10$S7Pvx0PmKsTSyB7i43mC8.0CZfTrQ1XFT64YnNwe34XFM8MxuWqLq
          //=> bt la: 123456
          //ta can phai nho la hoi nay no ko nhan "" => lam cach nao de chung ta select chuan?
          //=> querry truoc torng con voi
          //copy het vao cai query
          //cho nao can thay the ta dung " de chan dau`
          //cho thang user name vao giua
          pool.query("SELECT * FROM user_table WHERE username = '" + username + "'", function(err, rows){
                if (err)
                    return done(err);
                // loi o day thi phai
                console.log(rows.rows.length);
                if (rows.rows.length == 0) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                console.log(rows.rows[0]);
                if (!bcrypt.compareSync(password, rows.rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows.rows[0]);
            });
        })
    );
//  
//  
//  passport.use(
//      'local-login',
//      new LocalStrategy({
//          // by default, local strategy uses username and password, we will override with email
//          usernameField : 'fid',
//         
//          passReqToCallback : true // allows us to pass back the entire request to the callback
//      },
//      function(req, username, done) { // callback with email and password from our form
//
//        pool.query("SELECT * FROM user_table", function(err, rows){
//              if (err)
//                  return done(err);
//              // loi o day thi phai
//              console.log(rows.rows.length);
//
//              // all is well, return successful user
//              return done(null, rows.rows[0]);
//          });
//      })
//  );
    
    
    
};


