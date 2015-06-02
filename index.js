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
  this._error = null;

  this.request = Promise.promisifyAll(request.defaults({
    baseUrl: this.baseUrl,
    json: true
  }));
}

AstroDigital.prototype.search = search.search;
AstroDigital.prototype.sceneId = search.sceneId;
AstroDigital.prototype.cloudCover = search.cloudCover;
AstroDigital.prototype.cloudCoverFull = search.cloudCoverFull;
AstroDigital.prototype.acquisitionDate = search.acquisitionDate;
AstroDigital.prototype.path = search.path;
AstroDigital.prototype.row = search.row;
AstroDigital.prototype.rowAndPath = search.rowAndPath;
AstroDigital.prototype.rowOrPath = search.rowOrPath;
AstroDigital.prototype.xy = search.xy;
AstroDigital.prototype.bbox = search.bbox;
AstroDigital.prototype.queryField = search.queryField;
AstroDigital.prototype.queryRange = search.queryRange;
AstroDigital.prototype.and = search.and;
AstroDigital.prototype.or = search.or;
AstroDigital.prototype.limit = search.limit;
AstroDigital.prototype.skip = search.skip;

module.exports = AstroDigital;
