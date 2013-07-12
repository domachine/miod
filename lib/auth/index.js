
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose');

/**
 * Module exports.
 */

var app = module.exports = express();

// TODO: replace with real passport

app.use(function(req, res, next){
  var User = mongoose.model('User');
  User.find(function(err, users){
    if (err) return next(err);

    // return dummy users if it exists

    if (users.length) {
      req.user = users[0];
      return next();
    }

    // otherwise create it

    var user = new User({ name: 'dummyuser', files: [] });
    user.save(function(err){
      if (err) return next(err);
      req.user = user;
      next();
    });
  });
});
