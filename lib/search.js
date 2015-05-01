'use strict';

var qs = require('querystring');
var url = require('url');
var _ = require('lodash');

var wrapParens = _.template('(<%= query %>)');

function buildUri(params) {
  var querystring = qs.unescape(qs.stringify(params));
  var endpoint = '/search?' + querystring;

  return {uri: endpoint};
}

module.exports.search = function search(query, callback) {
  if (typeof query === 'function') {
    callback = query;
    query = this.query;
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

module.exports.sceneId = function sceneId(scene) {
  if (typeof scene === 'function') {
    return new Error('A scene ID string or array of scene ID strings is required.');
  }

  var query;
  var request = this.request;

  if (_.isString(scene)) {
    query = qs.stringify({sceneID: scene}, '&', ':');
  }

  if (_.isArray(scene)) {
    var scenes = _.map(scene, function(scene) {
      return qs.stringify({sceneID: scene}, '&', ':');
    });

    if (scenes.length > this.limitCount) {
      this.limitCount = scenes.length;
    }

    var conjoined = scenes.join('+OR+');
    query = wrapParens({ query: conjoined });
  }

  this.query = this.query.concat(query);

  return this;
}
