'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var dateRange = ['2014-12-01', '2015-01-01'];

describe('acquisitionDate', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should return 200 with valid date range', function() {
    return astro
      .acquisitionDate(dateRange)
      .search()
      .spread(function(res, result) {
        // console.log(res.request.uri);
        return expect(res.statusCode).to.equal(200);
      });
  });
});
