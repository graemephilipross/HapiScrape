const config = require('./config.js');
const redis = config.get('/redis');
const cacheEnabled = config.get('/cacheEnabled');

module.exports = {
  'redis': {
    'host': redis.host,
    'port': redis.port
  },
  cacheEnabled
};
