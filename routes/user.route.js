var express = require('express');
var shortid = require('shortid');

var db = require('../db');
var router = express.Router();
module.exports = router;

router.get('/', function (req, res) {
  console.log(db.get('users').value());
  res.render('users/index', {
    users: db.get('users').value()
  });
});

router.get('/search', function (req, res) {
  var q = req.query.q.toLowerCase();
  var matchedUsers = db.get('users').value().filter(function (user) {
    return user.name.toLowerCase().indexOf(q) !== -1;
  });
  res.render('users/index', {
    users: matchedUsers
  });
});

router.get('/create', function (req, res) {
  res.render('users/create');
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  var user = db.get('users').find({ id: id }).value();
  res.render('users/view', {
    user: user
  });
});

router.post('/create', function (req, res) {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
});