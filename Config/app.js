const config = require('./config.js')
const redis = config.get('/redis')
const cacheEnabled = config.get('/cacheEnabled')
const cacheExpiration = config.get('/cacheExpiration')
const scraperTimeout = config.get('/scraperTimeout')

module.exports = {
  'redis': {
    'host': redis.host,
    'port': redis.port
  },
  cacheEnabled,
  cacheExpiration,
  scraperTimeout
}
