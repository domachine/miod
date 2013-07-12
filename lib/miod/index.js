
/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path')
  , express = require('express')
  , Builder = require('component-builder')
  , writeFile = fs.writeFileSync
  , join = path.join;

/**
 * Module exports.
 */

var app = module.exports = express();

// setup application

app.set('view engine', 'jade');
app.set('views', __dirname);

// setup middleware

app.use(express.bodyParser());
app.use(function(req, res, next){
  var builder = new Builder(__dirname);
  builder.copyAssetsTo(join(__dirname, 'build'));
  builder.build(function(err, res){
    if (err) return next(err);
    writeFile(join(__dirname, 'build/miod.js'), res.require + res.js);
    writeFile(join(__dirname, 'build/miod.css'), res.css);
    next();
  });
});
app.use(express.static(join(__dirname, 'build')));
app.use(app.router);

/**
 * GET the upload form.
 */

app.get('/', function(req, res){
  res.render('index');
});

/**
 * Upload a file.
 */

app.post('/files', function(req, res){
  var file = req.files.file;
  console.log('uploaded', file.name);
  res.send(200);
});
