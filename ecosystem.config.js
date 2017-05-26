module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // Fused application
    {
      name      : 'scraper1',
      script    : 'index.js',
      watch     : true,
      env       : {
        NODE_ENV: 'development',
        NODE_PORT: '3001'
      },
      env_production : {
        NODE_ENV: 'production',
        NODE_PORT: '3001'
      }
    },
    {
      name      : 'scraper2',
      script    : 'index.js',
      watch     : true,
      env       : {
        NODE_ENV: 'development',
        NODE_PORT: '3002'
      },
      env_production : {
        NODE_ENV: 'production',
        NODE_PORT: '3002'
      }
    },
    {
      name      : 'scraper3',
      script    : 'index.js',
      watch     : true,
      env       : {
        NODE_ENV: 'development',
        NODE_PORT: '3003'
      },
      env_production : {
        NODE_ENV: 'production',
        NODE_PORT: '3003'
      }
    },
    {
      name      : 'scraper4',
      script    : 'index.js',
      watch     : true,
      env       : {
        NODE_ENV: 'development',
        NODE_PORT: '3004'
      },
      env_production : {
        NODE_ENV: 'production',
        NODE_PORT: '3004'
      }
    }
  ]
}