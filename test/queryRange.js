'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var field = 'cloudCover';
var range = [0, 20];

var obj = {};
var num = 123;
var str = 'not a range';

describe('queryRange', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should eturn a success 200 with the cloudCover range', function() {
    return astro
      .queryRange(field, range)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.cloudCover).to.be.within(0, 20);
        });
      });
  });

  it('should return an Error when passed object for key param with a callback', function(done) {
    astro
      .queryRange(obj, range)
      .search(function(err) {
        expect(err).to.be.instanceof(Error);
        done();
      });
  });

  it('should return an Error when passed number for key param with a callback', function(done) {
    astro
      .queryRange(num, range)
      .search(function(err) {
        expect(err).to.be.instanceof(Error);
        done();
      });
  });

  it('should return an Error when passed object for key param with a promise', function() {
    return astro
      .queryRange(obj, range)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });

  it('should return an Error when passed number for key param with a promise', function() {
    return astro
      .queryRange(num, range)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });

  it('should return an Error when passed object for value param with a callback', function(done) {
    astro
      .queryRange(field, obj)
      .search(function(err) {
        expect(err).to.be.instanceof(Error);
        done();
      });
  });

  it('should return an Error when passed object for value param with a promise', function() {
    return astro
      .queryRange(field, obj)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });

  it('should return an Error when passed number for value param with a callback', function(done) {
    astro
      .queryRange(field, num)
      .search(function(err) {
        expect(err).to.be.instanceof(Error);
        done();
      });
  });

  it('should return an Error when passed number for value param with a promise', function() {
    return astro
      .queryRange(field, num)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });

  it('should return an Error when passed string for value param with a callback', function(done) {
    astro
      .queryRange(field, str)
      .search(function(err) {
        expect(err).to.be.instanceof(Error);
        done();
      });
  });

  it('should return an Error when passed string for value param with a promise', function() {
    return astro
      .queryRange(field, str)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });
});
