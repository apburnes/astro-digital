'use strict';

var qs = require('querystring');
var _ = require('lodash');
require('date-utils');

var wrapParens = _.template('(<%= query %>)');
var createRange = _.template('[<%= min %>+TO+<%= max %>]');

function validateNumber(item) {
  var num = _.parseInt(item);

  if (_.isNaN(num)) {
    return false;
  }

  return true;
}

function validateCoordinate(threshold, value) {
  var validNumber = validateNumber(value);

  if (!validNumber) {
    return false;
  }

  var min = -threshold;
  var max = +threshold;

  return _.inRange(value, min, max);
}

function validateDate(item) {
  var date = new Date(item);

  return Date.validateYear(date);
}

function buildField(key, value) {
  var obj = {};
  obj[key] = value;

  return qs.unescape(qs.stringify(obj, '&', ':'));
}

function buildUri(params, type) {
  var querystring = qs.unescape(qs.stringify(params));
  var endpoint = '/' + type +'?' + querystring;

  return {uri: endpoint};
}

function buildRange(field, array) {
  var queryObject = {};

  var min = array[0];
  var max = array[1];

  var range = createRange({
    min: min,
    max: max
  });

  var querystring = buildField(field, range);

  return querystring;
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
    return buildField(field, number);
  }
  else {
    return new Error('A valid ' + field +' number must be between 1 and 3 digits');
  }
}

function buildExtent(extent, operators) {
  var upperY = buildRange('upperLeftCornerLatitude', extent.upperY);
  var lowerY = buildRange('lowerRightCornerLatitude', extent.lowerY);
  var lowerX = buildRange('lowerLeftCornerLongitude', extent.lowerX);
  var upperX = buildRange('upperRightCornerLongitude', extent.upperX);

  var query = upperY.concat(operators[0], lowerY, operators[1], lowerX, operators[2], upperX);

  return wrapParens({query: query});
}

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

function buildSearch(query, limitCount, skipCount) {
  var defaultParams = {
    limit: limitCount,
    skip: skipCount
  };

  var params = _.defaults({search: query}, defaultParams);
  return buildUri(params, 'search');
}

module.exports = {
  template: {
    wrapParens: wrapParens,
    createRange: createRange
  },
  validateNumber: validateNumber,
  validateCoordinate: validateCoordinate,
  validateDate: validateDate,
  buildField: buildField,
  buildUri: buildUri,
  buildRange: buildRange,
  buildRowPath: buildRowPath,
  buildExtent: buildExtent,
  buildSceneId: buildSceneId,
  buildSearch: buildSearch
};
