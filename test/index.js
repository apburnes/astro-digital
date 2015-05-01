'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var apiVersion = 'v1';
var baseUrl = 'https://api.astrodigital.com/v1';
var defaultLimit = '25';
var defaultSkip = '0';

describe('AstroDigital', function() {
  it('should construct AstroDigital with defaults', function(done) {
    var astro = AstroDigital();

    expect(astro).to.be.an('object');
    expect(astro.apiVersion).to.equal(apiVersion);
    expect(astro.baseUrl).to.equal(baseUrl);
    expect(astro.limitCount).to.equal(defaultLimit);
    expect(astro.skipCount).to.equal(defaultSkip);
    expect(astro.query).to.equal('');
    expect(astro.request).to.be.a('function');
    expect(astro.limit).to.be.a('function');
    expect(astro.skip).to.be.a('function');
    expect(astro.search).to.be.a('function');
    done();
  });
});
