'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var pathNum = 2;
var pathStr1 = '2';
var pathStr2 = '02';
var pathStr3 = '002';

var expectedPath = 2;

var obj = {};
var arr = [];
var str = 'not a path';

describe('path', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should success 200 with path number and results in designated path', function() {
    return astro
      .path(pathNum)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.path).to.equal(expectedPath);
        });
      });
  });

  it('should success 200 with path string length 1 and results in designated path', function() {
    return astro
      .path(pathStr1)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.path).to.equal(expectedPath);
        });
      });
  });

  it('should success 200 with path string length 2 and results in designated path', function() {
    return astro
      .path(pathStr2)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.path).to.equal(expectedPath);
        });
      });
  });

  it('should success 200 with path string length 3 and results in designated path', function() {
    return astro
      .path(pathStr3)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.path).to.equal(expectedPath);
        });
      });
  });

  it('should reject with invalid path type object', function() {
    return astro
      .path(obj)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });

  it('should reject with invalid path type array', function() {
    return astro
      .path(arr)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });

  it('should reject with invalid path type nonnumeric string', function() {
    return astro
      .path(str)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });
});
