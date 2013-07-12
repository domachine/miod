
/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path')
  , express = require('express')
  , Builder = require('component-builder')
  , mongoose = require('mongoose')
  , Grid = require('gridfs-stream')
  , writeFile = fs.writeFileSync
  , unlink = fs.unlinkSync
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

app.post('/files', function(req, res, next){
  var gfs = new Grid(mongoose.connection.db, mongoose.mongo)
    , file = req.files.file
    , path = file.path
    , readStream
    , writeStream;

  // write temporary file to database

  readStream = fs.createReadStream(path);
  writeStream = gfs.createWriteStream({ filename: file.name });
  writeStream.on('close', function(file){
    unlink(path);

    // append the file to the user's files

    req.user.files.push(file._id);
    req.user.save(function(err){
      if (err) return next(err);
      res.status(201).send(file);
    });
  });
  readStream.pipe(writeStream);
});
