'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var x = -77.0331808;
var y = 38.9076835;

describe('searchPoint', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should request 200 scences which overlay the XY coordinate', function() {
    return astro
      .xy(x, y)
      .search()
      .spread(function(res, result) {
        return expect(res.statusCode).to.equal(200);
      });
  });
});
