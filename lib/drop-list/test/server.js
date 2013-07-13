
/**
 * Module dependencies.
 */

var express = require('express');

// create app

var app = express();
app.use(express.static(process.cwd()));
app.get('/', function(req, res){
  res.sendfile('example.html');
});

/**
 * GET test data.
 */

app.get('/files', function(req, res, next){
  if (req.accepts('text,json') !== 'json') return next();

  // dump some dummy data

  res.send([
    { filename: 'file1' },
    { filename: 'file2' }
  ]);
});

// start server

app.listen(3000);
console.log('Test server listening on port 3000');
