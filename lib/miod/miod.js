
/**
 * Module dependencies.
 */

var Dropload = require('dropload')
  , query = require('query');

// initialize dropload

var drop = new Dropload(query('#drop'));

/**
 * Bind events.
 */

drop.on('error', function(err){

  // TODO: replace with something less ugly ...

  alert(err);
});

// handle file upload

drop.on('upload', function(upload){

  // handle progress

  console.log('upload', upload.file.name);
  upload.to('/files');
});
