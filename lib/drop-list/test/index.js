
/**
 * Module dependencies.
 */

var request = require('supertest')
  , mockery = require('mockery')
  , sinon = require('sinon')
  , express = require('express')
  , should = require('should');

/**
 * Tests.
 */

describe('DropList', function(){
  var app = express()
    , testData
    , query
    , user
    , collection;
  before(function(){
    var mongoose;
    testData = [
      { filename: 'test-file1' },
      { filename: 'test-file2' }
    ];
    query = {
      toArray: sinon.stub().callsArgWith(0, null, testData)
    };
    collection = {
      find: sinon.stub().returns(query)
    };
    user = { files: [ 'wejhxs123' ] };
    mongoose = {
      connection: {
        db: {
          collection: sinon.stub().callsArgWith(1, null, collection)
        }
      }
    };
    app.use(function(req, res, next){
      req.user = user;
      next();
    });
    mockery.registerMock('mongoose', mongoose);
    mockery.enable({ warnOnUnregistered: false });
    app.use(require('..'));
  });
  describe('GET /files', function(){
    it('should send a files array', function(done){
      request(app)
        .get('/files')
        .set('Accept', 'application/json')
        .expect(testData)
        .end(function(err, res){
          if (err) return done(err);
          collection.find.calledOnce.should.be.true;
          collection.find.args[0][0].should.eql({
            $or: user.files.map(function(f){ return { _id: f }; })
          });
          query.toArray.calledOnce.should.be.true;
          done();
        });
    });
  });
  after(function(){
    mockery.deregisterAll();
    mockery.disable();
  });
});
