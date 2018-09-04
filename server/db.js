var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:313616@localhost:5432/c584';
var db = pgp(connectionString);





// add query functions
function getAllPlayers(req, res, next) {
  db.any('select * from c584_poem')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL players'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}



	//where c584_poem.poemid = tenattractions.fid


function textfid(req, res, next) {
    //var playerID = parseInt(req.params.fid);
    db.any('select c584_poem.poemname from c584_poem,poet where c584_poem.poetid = poet.poetid')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved fid Player'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}



function getSinglePlayer(req, res, next) {
    var playerID = parseInt(req.params.id);
    db.one('select * from c584_poem where poemid = $1', playerID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Player'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPlayer(req, res, next) {
  console.log(req.query);
  db.none('insert into player(name, surname, dob) values (${name}, ${surname}, ${dob})', req.query)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one player'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatePlayer(req, res, next) {
  console.log(req.query);
  db.none('update player set name=$1, surname=$2, dob=$3 where id=$4',
    [req.query.name, req.query.surname, req.query.dob, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated player'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deletePlayer(req, res, next) {
  var playerId = parseInt(req.params.id);
  db.result('delete from player where id = $1', playerId)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} player`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
 
module.exports = {
  getAllPlayers: getAllPlayers,
  getSinglePlayer: getSinglePlayer,
  createPlayer: createPlayer,
  updatePlayer: updatePlayer,
  deletePlayer: deletePlayer,
  textfid: textfid
};

