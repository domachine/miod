
/**
 * Module dependencies.
 */

var Dropload = require('dropload')
  , query = require('query')
  , DropList = require('drop-list')
  , Drop = require('drop');

// initialize dropload

var dropLoad = new Dropload(query('#drop'));

// create drop list

var dropList = new DropList();
document.body.appendChild(dropList.el);
dropList.load();

/**
 * Bind events.
 */

dropLoad.on('error', function(err){

  // TODO: replace with something less ugly ...

  alert(err);
});

// handle file upload

dropLoad.on('upload', function(upload){
  var drop = new Drop(upload.file.name);

  // handle progress

  upload.on('progress', function(e){
    drop.progress(e.percent);
  });
  dropList.add(drop);
  upload.to('/files');
});
