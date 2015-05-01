'use strict';

var url = require('url');
var Promise = require('bluebird');
var request = require('request');
var search = require('./lib/search')

var BASE_URL = 'https://api.astrodigital.com';
var VERSION = require('./package.json').version;

function AstroDigital(options) {
  if (!(this instanceof AstroDigital)) {
    return new AstroDigital(options);
  }

  options = options || {};

  this.defaults = {
    apiVersion: 'v1',
    query: '',
    limitCount: '25',
    skipCount: '0'
  };

  this.version = VERSION;
  this.apiVersion = options.apiVersion || this.defaults.apiVersion;
  this.baseUrl = url.resolve(BASE_URL, this.apiVersion);
  this.query = options.query || this.defaults.query;
  this.limitCount = options.limit || this.defaults.limitCount;
  this.skipCount = options.skip || this.defaults.skipCount;

  this.request = Promise.promisifyAll(request.defaults({
    baseUrl: this.baseUrl,
    json: true
  }));
}

AstroDigital.prototype.search = search.search;
AstroDigital.prototype.limit = search.limit;
AstroDigital.prototype.skip = search.skip;
AstroDigital.prototype.sceneId = search.sceneId;

module.exports = AstroDigital;
