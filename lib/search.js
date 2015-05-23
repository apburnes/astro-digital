'use strict';

var qs = require('querystring');
var Promise = require('bluebird');
var _ = require('lodash');
require('date-utils');

var wrapParens = _.template('(<%= query %>)');
var rangeTemplate = _.template('[<%= min %>+TO+<%= max %>]');

/* AstroDigital Search Methods*/
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

function search(query, callback) {
  if (typeof query === 'function') {
    callback = query;
    query = this.query;
  }

  if (_.isError(this._error)) {
    return Promise
      .reject(this._error)
      .nodeify(callback);
  }

  query = query || this.query;

  var request = this.request;
  var opts = buildSearch.bind(this)(query);

  return request
    .getAsync(opts)
    .nodeify(callback, {spread: true});
};

function buildSceneId(scene) {
  var query;

  if (_.isString(scene)) {
    query = buildField('sceneID', scene);
  }

  if (_.isArray(scene)) {
    var scenes = _.map(scene, function(scene) {
      return buildField('sceneID', scene);
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
  this.query = this.query.concat(query);

  return this;
}

function cloudCover(field, range) {
  var validTypes = _.every(range, validateNumber);

  if (!validTypes) {
    this._error = new Error('Invalid range data types for ' + field);
    return this;
  }

  var coverRange = [_.min(range), _.max(range)];
  var querystring = buildRange(field, coverRange);

  this.query = this.query.concat(querystring);
  return this;
}

function acquisitionDate(field, range) {
  var validDates = _.every(range, validateDate);
  // console.log(validDates);

  // if (!validDates) {
  //   this._error = new Error('Invalid dates in aquisition date range.');
  //   return this;
  // }

  var dateRange = [range[0], range[1]];
  var querystring = buildRange(field, dateRange);

  this.query = this.query.concat(querystring);
  return this;
}

function pathRow(field, num) {
  var number = validateNumber(num);

  if (!number) {
    this._error = new Error('Path method must take a valid number or number string.');
    return this;
  }

  var pathNum = buildRowPath(field, num);

  if (_.isError(pathNum)) {
    this._error = pathNum;
    return this;
  }

  this.query = this.query.concat(pathNum);

  return this;
}

function queryField(key, value) {
  if (!(_.isString(key))) {
    this._error = new Error('The queryField key param must be string type.');
    return this;
  }

  if (!(_.isString(value)) && !(_.isNumber(value))) {
    this._error = new Error('The queryField value param must be string or number type.');
    return this;
  }

  var query = buildField(key, value);
  this.query = this.query.concat(query);

  return this;
}

function queryRange(key, value) {
  if (!(_.isString(key))) {
    this._error = new Error('The queryField key param must be string type.');
    return this;
  }

  if (!(_.isArray(value))) {
    this._error = new Error('The queryField value param must be an array type.');
    return this;
  }

  var query = buildRange(key, value);
  this.query = this.query.concat(query);

  return this;
}

function addOperator(operator) {
  var operator = operator.toUpperCase();

  this.query = this.query.concat('+', operator, '+');

  return this;
};

/* Utilities */
function validateNumber(item) {
  var num = _.parseInt(item);

  if (_.isNaN(num)) {
    return false;
  }

  return true;
}

function validateDate(item) {
  var date = new Date(item);

  return Date.validateYear(date);
}

function buildRowPath(field, value) {
  var formatted;
  var number = value.toString();

  if (number.length === 1) {
    formatted = '00'.concat(number);
    return buildField(field, formatted);
  }
  else if (number.length === 2) {
    formatted = '0'.concat(number);
    return buildField(field, formatted);
  }
  else if (number.length === 3) {
    return buildField(field, number)
  }
  else {
    return new Error('A valid ' + field +' number must be between 1 and 3 digits');
  }
}

function buildField(key, value) {
  var obj = {};
  obj[key] = value;

  return qs.unescape(qs.stringify(obj, '&', ':'))
}

function buildUri(params) {
  var querystring = qs.unescape(qs.stringify(params));
  var endpoint = '/search?' + querystring;

  return {uri: endpoint};
}

function buildRange(field, array) {
  var queryObject = {};

  var min = array[0];
  var max = array[1];

  var range = rangeTemplate({
    min: min,
    max: max
  });

  var querystring = buildField(field, range);

  return querystring;
}

function buildSearch(query) {
  var defaultParams = {
    limit: this.limitCount,
    skip: this.skipCount
  };

  var params = _.defaults({search: query}, defaultParams);
  return buildUri(params);
}

module.exports = {
  search: search,
  sceneId: sceneId,
  skip: skip,
  limit: limit,
  cloudCover: _.partial(cloudCover, 'cloudCover'),
  cloudCoverFull: _.partial(cloudCover, 'cloudCoverFull'),
  acquisitionDate: _.partial(acquisitionDate, 'acquisitionDate'),
  path: _.partial(pathRow, 'path'),
  row: _.partial(pathRow, 'row'),
  queryField: queryField,
  queryRange: queryRange,
  and: _.partial(addOperator, 'AND'),
  or: _.partial(addOperator, 'OR')
};
