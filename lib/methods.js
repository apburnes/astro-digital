'use strict';

function methods(callback) {
  var request = this.request;
  var opts = {
    uri: '/methods'
  };

  return request
    .getAsync(opts)
    .nodeify(callback, {spread: true});
}

module.exports = {
  methods: methods
};
