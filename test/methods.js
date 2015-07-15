'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var methodObjKeys = [
  'id',
  'name',
  'code',
  'bands',
  'satellites'
];

describe('methods', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should successfully request all available methods with a promise', function() {
    return astro
      .methods()
      .spread(function(res, result) {
        expect(res.statusCode).to.equal(200);
        expect(result).to.be.an('object');
        expect(result.count).to.be.at.least(4);
        expect(result.results).to.be.an('array');
        return result.results.map(function(item) {
          expect(item).to.be.an('object');
          return expect(item).to.have.all.keys(methodObjKeys);
        });
      });
  });

  it('should successfully request all available methods with a callback', function(done) {
    astro.methods(function(err, res, result) {
      expect(res.statusCode).to.equal(200);
      expect(result).to.be.an('object');
      expect(result.count).to.be.at.least(4);
      expect(result.results).to.be.an('array');
      done(err);
    });
  });
});
