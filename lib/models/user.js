
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * Module exports.
 */

module.exports = new Schema({

  // the user id used to match to login

  name: String,

  // the uploaded files

  files: { type: [ Schema.Types.ObjectId ] }
});
