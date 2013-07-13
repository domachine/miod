
/**
 * Module dependencies.
 */

var Drop = require('drop')
  , request = require('superagent')
  , DropView = Drop.View;

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
 * Load the available drops from the server.
 */

DropList.prototype.load = function(fn){
  var self = this;
  request
    .get('/files')
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err) return fn(err);
      res.body.forEach(function(file){
        var drop = new Drop(file.filename);
        drop.progress(100);
        self.add(drop);
      });
    });
};

/**
 * Add a new drop to the list.
 */

DropList.prototype.add = function(drop){
  var view = new DropView(drop);
  this.el.appendChild(view.el);
  return this;
};
