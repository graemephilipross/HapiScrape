/**
 * Created by graemeross on 21/07/2016.
 */

'use strict'

const routes = require('./routes')
const handler = require('./handler')
const config = require('../../Config/app')

const internals = {}

internals.handler = {
  apply (target, ctx, args) {
        // get second next callback param
    const [, next] = args
    return target(...args)
        .then(addresses => next(null, addresses))
        .catch(err => next(err))
  }
}

exports.register = function (server, options, next) {
  /*const proxy = new Proxy(virginAddressesService.virginAddressesAllYours, internals.handler)

  server.method('virginAddressesAllYoursCached', proxy, {
    cache: {
      cache: 'redisCache',
      expiresIn: config.cacheExpiration,
      generateTimeout: config.scraperTimeout * 2
    }
  })*/

  server.handler('partners', () => handler.partners)
  server.handler('allYours', () => handler.allYours)
  server.handler('addresses', () => handler.addresses)
  
  /*if (config.cacheEnabled) {
    server.handler('virginAddressesAllYours', () => handler.virginAddressesAllYoursCached(server))
  } else {
    server.handler('virginAddressesAllYours', () => handler.virginAddressesAllYours)
  }*/

  routes.registerRoutes(server, options)
  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}
