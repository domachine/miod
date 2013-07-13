
/**
 * Module dependencies.
 */

var DropView = require('drop').View;

/**
 * Module exports.
 */

module.exports = DropList;

/**
 * Initialize new drop list.
 */

function DropList() {
  this.el = document.createElement('div');
  this.el.setAttribute('id', 'drop-list');
}

/**
 * Add a new drop to the list.
 */

DropList.prototype.add = function(drop){
  var view = new DropView(drop);
  this.el.appendChild(view.el);
  return this;
};
