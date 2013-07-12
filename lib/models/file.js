
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * Module exports.
 */

module.exports = new Schema(
  {
    filename: { type: String, required: true }
  },

  // make sure to have the gridfs collection

  { collection: 'files' }
);
