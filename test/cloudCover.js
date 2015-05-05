'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var cloudCoverRange = [0, 20];

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

  it('should return 200 success with scenes containing cloudCoverFull between 0 and 20%', function(done) {
    astro
      .cloudCover(cloudCoverRange)
      .search(function(err, res, result) {
        expect(res.statusCode).to.equal(200);
        expect(result.results).to.have.length(25);
        result.results.forEach(function(scene) {
          return expect(scene.cloudCover).to.be.within(0, 20);
        });
        done(err);
      });
  });
});
