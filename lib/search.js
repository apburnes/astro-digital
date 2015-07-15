'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var util = require('./utils');

function queryCount(field, count) {
  var validNumber = util.validateNumber(count);

  if (!validNumber) {
    this[field] = this.defaults[field];
    return this;
  }

  this[field] = count.toString();

  return this;
}

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
  var opts = util.buildSearch(query, this.limitCount, this.skipCount);

  return request
    .getAsync(opts)
    .nodeify(callback, {spread: true});
}

function sceneId(scene) {
  if (!(_.isString(scene)) && !(_.isArray(scene))) {
    this._error = new Error('Invalid data type. Must be string or array of string IDs for scene ID');
    return this;
  }

  var query = util.buildSceneId(scene);
  this.query = this.query.concat(query);

  return this;
}

function cloudCover(field, range) {
  var validTypes = _.every(range, util.validateNumber);

  if (!validTypes) {
    this._error = new Error('Invalid range data types for ' + field);
    return this;
  }

  var coverRange = [_.min(range), _.max(range)];

  var query = util.buildRange(field, coverRange);
  this.query = this.query.concat(query);

  return this;
}

function acquisitionDate(field, range) {
  var validDates = _.every(range, util.validateDate);
  // console.log(validDates);

  // if (!validDates) {
  //   this._error = new Error('Invalid dates in aquisition date range.');
  //   return this;
  // }

  var dateRange = [range[0], range[1]];

  var query = util.buildRange(field, dateRange);
  this.query = this.query.concat(query);

  return this;
}

function pathRow(field, num) {
  var number = util.validateNumber(num);

  if (!number) {
    this._error = new Error('Path method must take a valid number or number string.');
    return this;
  }

  var pathNum = util.buildRowPath(field, num);

  if (_.isError(pathNum)) {
    this._error = pathNum;
    return this;
  }

  this.query = this.query.concat(pathNum);

  return this;
}

function rowPathOperator(operator, row, path) {
  var rowNumber = util.validateNumber(row);
  var pathNumber = util.validateNumber(path);

  if (!rowNumber) {
    this._error = new Error('The row number is not a valid type');
    return this;
  }

  if (!pathNumber) {
    this._error = new Error('The path number is not a valid type');
    return this;
  }

  var rowNum = util.buildRowPath('row', row);
  var pathNum = util.buildRowPath('path', path);

  if (_.isError(rowNum)) {
    this._error = pathNum;
    return this;
  }

  if (_.isError(pathNum)) {
    this._error = pathNum;
    return this;
  }

  var rowWithPath = rowNum.concat('+', operator, '+', pathNum);

  var query = util.template.wrapParens({query: rowWithPath});
  this.query = this.query.concat(query);

  return this;
}

function xy(x, y) {
  var validX = util.validateCoordinate(180, x);
  var validY = util.validateCoordinate(90, y);

  if (!validX || !validY) {
    this._error = new Error('Searching an xy requires valid Latitude and Longitude');
  }

  var operators = ['+AND+', '+AND+', '+AND+'];
  var extent = {
    lowerX: [-1000, x],
    lowerY: [-1000, y],
    upperX: [x, 1000],
    upperY: [y, 1000]
  };

  var query = util.buildExtent(extent, operators);
  this.query = this.query.concat(query);

  return this;
}

function bbox(xMin, yMin, xMax, yMax) {
  var validXMin = util.validateCoordinate(180, xMin);
  var validYMin = util.validateCoordinate(90, yMin);
  var validXMax = util.validateCoordinate(180, xMax);
  var validYMax = util.validateCoordinate(90, yMax);

  if (!validXMin || !validYMin || !validXMax || !validYMax) {
    this._error = new Error('Searching a bbox requires valid Latitudes and Longitudes');
  }

  var operators = ['+AND+', '+OR+', '+AND+'];
  var extent = {
    lowerX: [xMin, xMax],
    lowerY: [yMin, yMax],
    upperX: [xMin, xMax],
    upperY: [yMin, yMax]
  };

  var query = util.buildExtent(extent, operators);
  this.query = this.query.concat(query);

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

  var query = util.buildField(key, value);
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

  var query = util.buildRange(key, value);
  this.query = this.query.concat(query);

  return this;
}

function addOperator(operator) {
  operator = operator.toUpperCase();

  this.query = this.query.concat('+', operator, '+');

  return this;
}

module.exports = {
  search: search,
  sceneId: sceneId,
  skip: _.partial(queryCount, 'skipCount'),
  limit: _.partial(queryCount, 'limitCount'),
  cloudCover: _.partial(cloudCover, 'cloudCover'),
  cloudCoverFull: _.partial(cloudCover, 'cloudCoverFull'),
  acquisitionDate: _.partial(acquisitionDate, 'acquisitionDate'),
  path: _.partial(pathRow, 'path'),
  row: _.partial(pathRow, 'row'),
  rowAndPath: _.partial(rowPathOperator, 'AND'),
  rowOrPath: _.partial(rowPathOperator, 'OR'),
  xy: xy,
  bbox: bbox,
  queryField: queryField,
  queryRange: queryRange,
  and: _.partial(addOperator, 'AND'),
  or: _.partial(addOperator, 'OR')
};
