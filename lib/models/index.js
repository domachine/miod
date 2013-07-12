
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

/**
 * Module exports.
 */

// load user schema

exports.User = mongoose.model('User', require('./user'));

// load file schema

exports.File = mongoose.model('File', require('./file'));
