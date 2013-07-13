
/**
 * Module dependencies.
 */

var DropList = require('drop-list')
  , Drop = require('drop');

// create drop-list

var dropList = new DropList();
document.body.appendChild(dropList.el);
dropList.load();
