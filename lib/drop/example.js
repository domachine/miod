
/**
 * Module depdencies.
 */

var Drop = require('drop')
  , View = Drop.View;

// render example view.

var drop = new Drop('long-long-long-filename-which-is-called-my-file.txt');
var view = new View(drop);
document.body.appendChild(view.el);
drop.progress(50);
