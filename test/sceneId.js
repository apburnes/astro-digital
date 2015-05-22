'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var scene = 'LC80110442014358LGN00';
var scenes = ['LC80110442014358LGN00', 'LC82281122014358LGN00'];

var sceneFixture = require('./fixtures/LC80110442014358LGN00.json');
var scenesFixture = require('./fixtures/multipleScenes.json');

var obj = {};
var num = 123;

describe('sceneId', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should return a success 200 with the scene id with a callback', function(done) {
    astro
      .sceneId(scene)
      .search(function(err, res, result) {
        expect(res.statusCode).to.equal(200);
        expect(result).to.deep.equal(sceneFixture);
        done(err);
      });
  });

  it('should return a success 200 with the scene array with a callback', function(done) {
    astro
      .sceneId(scenes)
      .search(function(err, res, result) {
        expect(res.statusCode).to.equal(200);
        expect(result).to.deep.equal(scenesFixture);
        done(err);
      });
  });


  it('should eturn a success 200 with the scene id with a promise', function() {
    return astro
      .sceneId(scene)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return expect(result).to.deep.equal(sceneFixture);
      });
  });

  it('should eturn a success 200 with the scene array with a promise', function() {
    return astro
      .sceneId(scenes)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return expect(result).to.deep.equal(scenesFixture);
      });
  });

  it('should return an Error when passed an object with a callback', function(done) {
    astro.sceneId(obj, function(err) {
      expect(err).to.be.instanceof(Error);
      done();
    });
  });

  it('hould return an Error when passed a number with a callback', function(done) {
    astro.sceneId(num, function(err) {
      expect(err).to.be.instanceof(Error);
      done();
    });
  });

  it('should return an Error when passed an object with a promise', function() {
    return astro.sceneId(obj)
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });


  it('should return an Error when passed a number with a promise', function() {
    return astro.sceneId(num)
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });
});
