'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');
var astro = AstroDigital();

var query = 'sceneID:LC80110442014358LGN00'
var invalidQuery = 'notaquery';

var LC80110442014358LGN00 = require('./fixtures/LC80110442014358LGN00.json');
var notFound = require('./fixtures/notFound.json');

var defaultLimit = 25;
var totalScenes = 462376;

describe('search', function() {

  it('should return 200 with the scene when passed a string with a callback', function(done) {
    astro.search(query, function(err, res) {
      var response = res[0];
      var result = res[1];
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.an('object');
      expect(result).to.deep.equal(LC80110442014358LGN00);
      done(err);
    });
  });

  it('should return 200 with the scene when passed a string with a promise', function(done) {
    astro.search(query)
      .spread(function(response, result) {
        expect(response.statusCode).to.equal(200);
        expect(result).to.be.an('object');
        expect(result).to.deep.equal(LC80110442014358LGN00);
        done();
      });
  });

  it('should return default limit of scenes without a query with a callback', function(done) {
    astro.search(function(err, res) {
      var response = res[0];
      var meta = res[1].meta;
      expect(response.statusCode).to.equal(200);
      expect(meta).to.be.an('object');
      expect(meta.results.limit).to.equal(defaultLimit);
      expect(meta.results.total).to.be.greaterThan(totalScenes);
      done(err);
    });
  });

  it('should return default limit of scenes without a query with a promise', function(done) {
    astro.search()
      .spread(function(response, result) {
        expect(response.statusCode).to.equal(200);
        expect(result.meta).to.be.an('object');
        expect(result.meta.results.limit).to.equal(defaultLimit);
        expect(result.meta.results.total).to.be.greaterThan(totalScenes);
        done();
      });
  });

  it('should return a 404 status when passed an invalid query', function(done) {
    astro.search(invalidQuery, function(err, res) {
      var response = res[0];
      var result = res[1];
      expect(response.statusCode).to.equal(404);
      expect(result).to.be.an('object');
      expect(result).to.deep.equal(notFound);
      done(err);
    });
  });
});
