'use strict';

var Promise = require('bluebird');
var joi = require('joi');

var schema = joi.object().keys({
  email: joi.string().email(),
  sceneID: joi.string(),
  satellite: joi.string().valid('l8'),
  process: joi.string().valid('trueColor', 'urbanFalse', 'vegHealth')
});

function publish(email, sceneId, process, satellite, callback) {
  if (typeof satellite === 'function') {
    callback = satellite;
    satellite = 'l8';
  }

  var request = this.request;

  var form = {
    email: email,
    sceneID: sceneId,
    process: process,
    satellite: satellite || 'l8'
  };

  return joi.validate(form, schema, function(err, validForm) {
    if (err) {
      return Promise
        .reject(err)
        .nodeify(callback);
    }

    var opts = {
      uri: '/publish',
      form: validForm
    };

    return request
      .postAsync(opts)
      .nodeify(callback, {spread: true});
  });
}

module.exports = {
  publish: publish
};
