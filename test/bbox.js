'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var xMin = -100;
var yMin = 30;
var xMax = -80;
var yMax = 40;

describe('bbox', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should return a success 200 with scences that fall within the bounding box', function() {
    return astro
      .bbox(xMin, yMin, xMax, yMax)
      .search()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        return;
      });
  });
});
