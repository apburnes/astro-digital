'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var pathNum = '002';
var rowNum = '011';

var expectedPath = 2;
var expectedRow = 11;

describe('rowAndPath', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should be a success 200 to find scences in a certain row and path', function() {
    return astro
      .rowAndPath(rowNum, pathNum)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          expect(item.row).to.equal(expectedRow);
          return expect(item.path).to.equal(expectedPath);
        });
      });
  });
});

describe('rowOrPath', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should be a success 200 to find scences in a certain row and path', function() {
    return astro
      .rowOrPath(rowNum, pathNum)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          if (item.row !== expectedRow) {
            return expect(item.path).to.equal(expectedPath);
          }
          else {
            return expect(item.row).to.equal(expectedRow);
          }
        });
      });
  });
});
