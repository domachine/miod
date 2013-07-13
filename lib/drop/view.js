
/**
 * Module dependencies.
 */

var Progress = require('progress')
  , domify = require('domify')
  , reactive = require('reactive')
  , dom = require('dom')
  , template = require('./template');

/**
 * Module exports.
 */

module.exports = DropView;

/**
 * Initialize new drop-view.
 *
 * @param {Drop} drop the model
 */

function DropView(drop) {
  var progress = new Progress();
  progress.update(drop.progress());

  // holds the model of the view

  this.model = drop;
  this.el = domify(template);
  this.model.on('change progress', function(n){
    progress.update(n);
  });
  dom(progress.el).addClass('drop-progress');
  dom(this.el).append(progress.el);
  reactive(this.el, this.model, this);
}
