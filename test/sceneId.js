'use strict';

var expect = require('chai').expect;

var AstroDigital = require('../');

var scene = 'LC80110442014358LGN00';
var scenes = ['LC80110442014358LGN00', 'LC82281122014358LGN00'];

var sceneFixture = require('./fixtures/LC80110442014358LGN00.json');
var scenesFixture = require('./fixtures/multipleScenes.json');

describe('sceneId', function() {
  var astro;

  beforeEach(function(done) {
    astro = AstroDigital();
    done();
  });

  afterEach(function(done) {
    astro = null;
    done();
  });

  it('should return a success 200 with the scene id with a callback', function(done) {
    astro
      .sceneId(scene)
      .search(function(err, res) {
        var response = res[0];
        var result = res[1];

        expect(response.statusCode).to.equal(200);
        expect(result).to.deep.equal(sceneFixture);
        done(err);
      });
  });

  it('should return a success 200 with the scene array with a callback', function(done) {
    astro
      .sceneId(scenes)
      .search(function(err, res) {
        var response = res[0];
        var result = res[1];

        expect(response.statusCode).to.equal(200);
        expect(result).to.deep.equal(scenesFixture);
        done(err);
      });
  });
});
