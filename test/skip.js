'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');
var astro = AstroDigital();

var defaultSkip = '0';
var skip100String = '100';
var skip100Int = 100;

describe('skip', function() {

  it('should return the default skipCount of 0', function(done) {
    var skip = astro.skip();
    expect(skip.skipCount).to.equal(defaultSkip);
    done();
  });

  it('should return a new skipCount of 100 with an integer', function(done) {
    var skip = astro.skip(skip100Int);
    expect(skip.skipCount).to.equal(skip100String);
    done();
  });

  it('should return a new skipCount of 100 with an integer string', function(done) {
    var skip = astro.skip(skip100String);
    expect(skip.skipCount).to.equal(skip100String);
    done();
  });

  it('should return the default skipCount with a NaN', function(done) {
    var skip = astro.skip(NaN);
    expect(skip.skipCount).to.equal(defaultSkip);
    done();
  });
});
