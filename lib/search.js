'use strict';

var qs = require('querystring');
var url = require('url');
var _ = require('lodash');

function buildUri(params) {
  var querystring = qs.stringify(params, '&');
  var endpoint = '/search?' + querystring;

  return {uri: endpoint};
}

module.exports.limit = function limit(count) {
  var num = _.parseInt(count);

  if (_.isNaN(num)) {
    this.limitCount = this.defaults.limitCount;
    return this;
  }

  this.limitCount = num.toString();
  return this;
};

module.exports.skip = function skip(count) {
  var num = _.parseInt(count);

  if (_.isNaN(num)) {
    this.skipCount = this.defaults.skipCount;
    return this;
  }

  this.skipCount = num.toString();
  return this;
};

module.exports.search = function search(query, callback) {
  if (typeof query === 'function') {
    callback = query;
    query = this.query || {};
  }

  var defaultParams = {
    limit: this.limitCount,
    skip: this.skipCount
  };

  var request = this.request;
  var params = _.defaults({search: query}, defaultParams);
  var opts = buildUri(params);

  return request
    .getAsync(opts)
    .nodeify(callback);
};
