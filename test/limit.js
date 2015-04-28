'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');
var astro = AstroDigital();

var defaultLimit = '25';
var limit100String = '100';
var limit100Int = 100;

describe('limit', function() {

  it('should return the default limitCount of 25', function(done) {
    var limit = astro.limit();
    expect(limit.limitCount).to.equal(defaultLimit);
    done();
  });

  it('should return a new limitCount of 100 with a integer', function(done) {
    var limit = astro.limit(limit100Int);
    expect(limit.limitCount).to.equal(limit100String);
    done();
  });

  it('should return a new limitCount of 100 with a integer string', function(done) {
    var limit = astro.limit(limit100String);
    expect(limit.limitCount).to.equal(limit100String);
    done();
  });

  it('should return a the default limitCount with a NaN', function(done) {
    var limit = astro.limit(NaN);
    expect(limit.limitCount).to.equal(defaultLimit);
    done();
  });
});
