'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var anAnd = '+AND+';
var anOr = '+OR+';
var andOr = '+AND++OR+';
var orAnd = '+OR++AND+';

var lowRange = [0, 10];
var highRange = [90, 100];

describe('operators', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should return the query with an "AND" operator', function() {
    var test = astro.and();
    return expect(test.query).to.equal(anAnd);
  });

  it('should return the query with an "OR" operator', function() {
    var test = astro.or();
    return expect(test.query).to.equal(anOr);
  });

  it('should return the query with an "AND/OR" operator', function() {
    var test = astro.and().or();
    return expect(test.query).to.equal(andOr);
  });

  it('should return the query with an "OR/AND" operator', function() {
    var test = astro.or().and();
    return expect(test.query).to.equal(orAnd);
  });

  it('should return a 200 with cloud cover between 0-5 or 90-100', function() {
    return astro
      .cloudCover(lowRange)
      .or()
      .cloudCover(highRange)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return result.results.map(function(item) {
          return expect(item.cloudCover).to.not.be.within(10, 90);
        });
      });
  });
});
