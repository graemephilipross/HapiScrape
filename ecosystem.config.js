module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'scraper',
      script    : 'index.js',
      watch     : true,
      env       : {
        NODE_ENV: 'development',
        NODE_PORT: '3030'
      },
      env_production : {
        NODE_ENV: 'production',
        NODE_PORT: '3030'
      }
    }
  ]
}