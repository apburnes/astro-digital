'use strict';

var qs = require('querystring');
var Promise = require('bluebird');
var _ = require('lodash');

var wrapParens = _.template('(<%= query %>)');

function buildUri(params) {
  var querystring = qs.unescape(qs.stringify(params));
  var endpoint = '/search?' + querystring;

  return {uri: endpoint};
}

function buildSearch(query) {
  var defaultParams = {
    limit: this.limitCount,
    skip: this.skipCount
  };

  var params = _.defaults({search: query}, defaultParams);
  return buildUri(params);
}

function search(query, callback) {
  if (typeof query === 'function') {
    callback = query;
    query = this.query;
  }

  var request = this.request;
  var opts = buildSearch.bind(this)(query);

  return request
    .getAsync(opts)
    .nodeify(callback, {spread: true});
};

function limit(count) {
  var num = _.parseInt(count);

  if (_.isNaN(num)) {
    this.limitCount = this.defaults.limitCount;
    return this;
  }

  this.limitCount = num.toString();
  return this;
};

function skip(count) {
  var num = _.parseInt(count);

  if (_.isNaN(num)) {
    this.skipCount = this.defaults.skipCount;
    return this;
  }

  this.skipCount = num.toString();
  return this;
};

function validateSceneId(scene) {
  var query;

  if (_.isString(scene)) {
    query = qs.stringify({sceneID: scene}, '&', ':');
  }

  if (_.isArray(scene)) {
    var scenes = _.map(scene, function(scene) {
      return qs.stringify({sceneID: scene}, '&', ':');
    });

    var conjoined = scenes.join('+OR+');
    query = wrapParens({ query: conjoined });
  }

  return query;
}

function sceneId(scene, callback) {
  if (!(_.isString(scene)) && !(_.isArray(scene))) {
    return Promise
      .reject(new Error('A scene ID string or array of scene ID strings is required.'))
      .nodeify(callback);
  }

  var request = this.request;
  var query = validateSceneId(scene);
  var opts = buildSearch.bind(this)(query);

  return request
    .getAsync(opts)
    .nodeify(callback, {spread: true});
}

module.exports = {
  search: search,
  sceneId: sceneId,
  skip: skip,
  limit: limit
};
