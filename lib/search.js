'use strict';

var qs = require('querystring');
var Promise = require('bluebird');
var _ = require('lodash');
require('date-utils');

var wrapParens = _.template('(<%= query %>)');
var rangeTemplate = _.template('[<%= min %>+TO+<%= max %>]');

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

  if (_.isError(this._error)) {
    return Promise
      .reject(this.error)
      .nodeify(callback);
  }

  query = query || this.query;

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

function buildSceneId(scene) {
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
  var query = buildSceneId(scene);
  var opts = buildSearch.bind(this)(query);

  return request
    .getAsync(opts)
    .nodeify(callback, {spread: true});
}

function buildRange(array, field) {
  var queryObject = {};

  var min = array[0];
  var max = array[1];

  var range = rangeTemplate({
    min: min,
    max: max
  });

  queryObject[field] = range;

  var querystring = qs.unescape(qs.stringify(queryObject, '&', ':'));

  return querystring;
}

function validateNumber(item) {
  var num = _.parseInt(item);

  if (_.isNaN(num)) {
    return false;
  }

  return true;
}

function cloudCover(field, range) {
  var validTypes = _.every(range, validateNumber);

  if (!validTypes) {
    this._error = new Error('Invalid range data types for ' + field);
    return this;
  }

  var coverRange = [_.min(range), _.max(range)];
  var querystring = buildRange(coverRange, field);

  this.query = this.query.concat(querystring);
  return this;
}

function validateDate(item) {
  var date = new Date(item);

  return Date.validateYear(date);
}

function acquisitionDate(field, range) {
  var validDates = _.every(range, validateDate);
  // console.log(validDates);

  // if (!validDates) {
  //   this._error = new Error('Invalid dates in aquisition date range.');
  //   return this;
  // }

  var dateRange = [range[0], range[1]];
  var querystring = buildRange(dateRange, field);

  this.query = this.query.concat(querystring);
  return this;
}

function addOperator(operator) {
  var operator = operator.toUpperCase();

  this.query = this.query.concat('+', operator, '+');

  return this;
};

module.exports = {
  search: search,
  sceneId: sceneId,
  skip: skip,
  limit: limit,
  cloudCover: _.partial(cloudCover, 'cloudCover'),
  cloudCoverFull: _.partial(cloudCover, 'cloudCoverFull'),
  acquisitionDate: _.partial(acquisitionDate, 'acquisitionDate'),
  and: _.partial(addOperator, 'AND'),
  or: _.partial(addOperator, 'OR')
};
