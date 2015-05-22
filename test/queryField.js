'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var sceneFixture = require('./fixtures/LC80110442014358LGN00.json');

var field = 'sceneID';
var scene = 'LC80110442014358LGN00';

var obj = {};
var num = 123;

describe('queryField', function() {
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
      .queryField(field, scene)
      .search(function(err, res, result) {
        expect(res.statusCode).to.equal(200);
        expect(result).to.deep.equal(sceneFixture);
        done(err);
      });
  });

  it('should eturn a success 200 with the scene id with a promise', function() {
    return astro
      .queryField(field, scene)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return expect(result).to.deep.equal(sceneFixture);
      });
  });

  it('should return an Error when passed object for key param with a callback', function(done) {
    astro
      .queryField(obj, scene)
      .search(function(err) {
        expect(err).to.be.instanceof(Error);
        done();
      });
  });

  it('should return an Error when passed number for key param with a callback', function(done) {
    astro
      .queryField(num, scene)
      .search(function(err) {
        expect(err).to.be.instanceof(Error);
        done();
      });
  });

  it('should return an Error when passed object for key param with a promise', function() {
    return astro
      .queryField(obj, scene)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });

  it('should return an Error when passed number for key param with a promise', function() {
    return astro
      .queryField(num, scene)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });

  it('should return an Error when passed object for value param with a callback', function(done) {
    astro
      .queryField(field, obj)
      .search(function(err) {
        expect(err).to.be.instanceof(Error);
        done();
      });
  });

  it('should return an Error when passed object for value param with a promise', function() {
    return astro
      .queryField(field, obj)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });
});
