'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var rowNum = 2;
var rowStr1 = '2';
var rowStr2 = '02';
var rowStr3 = '002';

var expectedrow = 2;

var obj = {};
var arr = [];
var str = 'not a row';

describe('row', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should success 200 with row number and results in designated row', function() {
    return astro
      .row(rowNum)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.row).to.equal(expectedrow);
        });
      });
  });

  it('should success 200 with row string length 1 and results in designated row', function() {
    return astro
      .row(rowStr1)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.row).to.equal(expectedrow);
        });
      });
  });

  it('should success 200 with row string length 2 and results in designated row', function() {
    return astro
      .row(rowStr2)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.row).to.equal(expectedrow);
        });
      });
  });

  it('should success 200 with row string length 3 and results in designated row', function() {
    return astro
      .row(rowStr3)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.row).to.equal(expectedrow);
        });
      });
  });

  it('should reject with invalid row type object', function() {
    return astro
      .row(obj)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });

  it('should reject with invalid row type array', function() {
    return astro
      .row(arr)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });

  it('should reject with invalid row type nonnumeric string', function() {
    return astro
      .row(str)
      .search()
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });
});
