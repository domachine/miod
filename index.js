
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , express = require('express');
mongoose.connect('mongodb://localhost/test');

// create application

var app = express();

// load models

require('./lib/models');

// setup application

app.use(express.logger('dev'));
app.use(express.favicon());
app.use(require('./lib/auth'));
app.use(require('./lib/miod'));
app.listen(3000);
