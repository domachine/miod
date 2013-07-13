
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
  User.findOne(function(err, user){
    if (err) return next(err);

    // return dummy users if it exists

    if (user) {
      req.user = user;
      return next();
    }

    // otherwise create it

    user = new User({ name: 'dummyuser', files: [] });
    user.save(function(err){
      if (err) return next(err);
      req.user = user;
      next();
    });
  });
});
