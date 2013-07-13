
/**
 * Module dependencies.
 */

var DropList = require('drop-list')
  , Drop = require('drop');

// create drop-list

var dropList = new DropList();
document.body.appendChild(dropList.el);
dropList
  .add(new Drop('file1').progress(50))
  .add(new Drop('file2').progress(30));
