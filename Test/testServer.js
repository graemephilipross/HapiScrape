'use strict'

const serverFactory = require('../server')

let server = null

exports.wait = done => {
  if (server && server.info.started > 0) {
    return done()
  }

  return serverFactory(serverInstance => {
    server = serverInstance
    done()
  })
}

exports.instance = () => server;

// Proxy server methods to instance
[
  'inject',
  'table',
  'route',
  'ext'
].forEach(method => {
  exports[method] = function () {
        // eslint-disable-next-line prefer-rest-params
    return server[method].apply(server, arguments)
  }
})
