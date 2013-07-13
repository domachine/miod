
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose');

/**
 * Module exports.
 */

var app = module.exports = express();

/**
 * GET the session data.
 */

app.get('/files', function(req, res, next){

  // perform content negotiation

  if (req.accepts('text,json') !== 'json') return next();
  mongoose.connection.db.collection('fs.files', function(err, collection){
    if (err) return next(err);
    var condition = req.user.files.map(function(file){
      return { _id: file };
    });
    collection.find({ $or: condition }).toArray(function(err, files){
      if (err) return next(err);
      res.send(files);
    });
  });
});
