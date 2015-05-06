'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var coverRangeInt = [0, 20];
var coverRangeString = ['0', '20'];
var invalidRange = ['not', 'range'];

describe('cloudCover', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should return 200 with cloudCover between 0 and 20% using intergers', function() {
    return astro
      .cloudCover(coverRangeInt)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.cloudCover).to.be.within(0, 20);
        });
      });
  });

  it('should return 200 with cloudCover between 0 and 20% using strings', function() {
    return astro
      .cloudCover(coverRangeString)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.cloudCover).to.be.within(0, 20);
        });
      });
  });

  it('should return error with invalid range', function() {
    return astro
      .cloudCover(invalidRange)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });
});

describe('cloudCoverFull', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should return 200 with cloudCoverFull between 0 and 20% using intergers', function() {
    return astro
      .cloudCoverFull(coverRangeInt)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.cloudCoverFull).to.be.within(0, 20);
        });
      });
  });

  it('should return 200 with cloudCoverFull between 0 and 20% using strings', function() {
    return astro
      .cloudCoverFull(coverRangeString)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.cloudCoverFull).to.be.within(0, 20);
        });
      });
  });

  it('should return error with invalid range', function() {
    return astro
      .cloudCover(invalidRange)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });
});
