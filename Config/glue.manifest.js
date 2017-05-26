const config = require('./app')

module.exports = {
  'server': {
    'cache': [
      {
        'name': 'redisCache',
        'engine': 'catbox-redis',
        'host': config.redis.host,
        'port': config.redis.port,
        'partition': 'virginscraper'
      }
    ]
  },
  'connections': [
    {
      'port': process.env.NODE_PORT || 3030,
      'labels': ['api'],
      'routes': {
        'cors': true
      }
    }
  ],
  'registrations': [
    { 'plugin': { 'register': 'inert' } },
    { 'plugin': { 'register': './Public/index' } },
    {
      'plugin': {
        'register': './Scraper/index',
        'select': ['api'],
        'routes': {
          'prefix': '/api'
        }
      }
    },
    {
      'plugin': {
        'register': './CouncilTax/index',
        'select': ['api'],
        'routes': {
          'prefix': '/api'
        }
      }
    }
  ]
}
