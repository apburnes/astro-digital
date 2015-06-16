'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var email = 'email@example.com';
var scenedId = 'LC80351142015001LGN00';
var processType = 'trueColor';

var invalidEmail = 'notanemail';
var invalidProcessType = 'notaprocess';

describe('publish', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should success 200 publish a scene with a promise', function() {
    return astro
      .publish(email, scenedId, processType)
      .spread(function(res, data) {
        return expect(res.statusCode).to.equal(200);
      });
  });

  it('should success 200 publish a scene with a callback', function(done) {
    astro.publish(email, scenedId, processType, function(err, res, data) {
      expect(res.statusCode).to.equal(200);
      done(err);
    });
  });

  it('should with error if invalid email with a callback', function(done) {
    astro.publish(invalidEmail, scenedId, processType, function(err) {
      expect(err).to.be.instanceof(Error);
      done();
    });
  });

  it('should reject with error if invalid email with a promise', function() {
    return astro
      .publish(invalidEmail, scenedId, processType)
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });

  it('should reject 400 with invalid process type with a callback', function(done) {
    astro.publish(email, scenedId, invalidProcessType, function(err, res) {
      expect(err).to.be.instanceof(Error);
      done();
    });
  });

  it('should reject with 400 with invalid process type with a promise', function() {
    return astro
      .publish(email, scenedId, invalidProcessType)
      .catch(function(err) {
        return expect(err).to.be.instanceof(Error);
      });
  });
});
