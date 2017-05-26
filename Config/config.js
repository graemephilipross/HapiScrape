'use strict';

const Confidence = require('confidence');

const store = new Confidence.Store({
  redis: {
    $filter: 'env',
    production: {
      'host': '192.168.1.15',
      'port': '6379'
    },
    $default: {
      'host': '192.168.1.15',
      'port': '6379'
    }
  },
  cacheEnabled: true
});

const criteria = {
  env: process.env.NODE_ENV
};

exports.get = function (key) {
  return store.get(key, criteria);
};
