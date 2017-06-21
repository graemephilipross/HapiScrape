'use strict'

const Confidence = require('confidence')

const store = new Confidence.Store({
  redis: {
    $filter: 'env',
    production: {
      'host': '139.162.240.78',
      'port': '6379'
    },
    $default: {
      'host': '192.168.1.15',
      'port': '6379'
    }
  },
  cacheEnabled: true,
  cacheExpiration: 30 * 7 * 24 * 60 * 60 * 1000, // -- test with 10000 -- currently 1 month
  scraperTimeout: 30000
})

const criteria = {
  env: process.env.NODE_ENV
}

exports.get = function (key) {
  return store.get(key, criteria)
}
