
/**
 * Module dependencies.
 */

var Emitter = require('emitter');

/**
 * Module exports.
 */

exports = module.exports = Drop;
exports.View = require('./view');

/**
 * Initialize new drop model.
 *
 * @param {String} filename
 */

function Drop(filename) {
  this._filename = filename;
  this._progress = 0;
}

// inherit from emitter

Emitter(Drop.prototype);

/**
 * Set a property.
 *
 * @param {String} property
 * @param {String} value
 *
 * @api private
 */

Drop.prototype.set = function(property, value){
  var old = this['_' + property];

  // do nothing if the value wasn't changed

  if (old === value) return value;
  this['_' + property] = value;
  this.emit('change ' + property, value);
  return value;
};

/**
 * Pull out the value of `property`.
 *
 * @param {String} property
 *
 * @api private
 */

Drop.prototype.get = function(property){
  return this['_' + property];
};

/**
 * Accessor for the `filename` property.
 */

Drop.prototype.filename = function(value){
  if (arguments.length) return this.set('filename', value);
  else return this.get('filename');
};

/**
 * Accessor for the `progress` property.
 */

Drop.prototype.progress = function(value){
  if (arguments.length) return this.set('progress', value);
  else return this.get('progress');
};
