var express = require('express'),
    _       = require('lodash'),
    jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

var users = [{
  id: 1,
  username: 'Darth Vader ',
  password: 'iambadass'
}];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}

app.post('/users', function(req, res) {
  console.log("Entered to register---");
  console.log(res.body);
  
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }
  if (_.find(users, {username: req.body.username})) {
   return res.status(400).send("A user with that username already exists");
  }

  var profile = _.pick(req.body, 'username', 'password', 'extra');
  profile.id = _.max(users, 'id').id + 1;

  users.push(profile);

  res.status(201).send("Welcome back " + req.body.username);
});

app.post('/sessions/create', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  var user = _.find(users, {username: req.body.username});
  if (!user) {
    return res.status(401).send("The username or password don't match");
  }

  if (!user.password === req.body.password) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send("Welcome to scalegray " + req.body.username);
});
