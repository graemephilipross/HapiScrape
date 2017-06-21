/**
 * Created by graemeross on 21/06/2017.
 */

'use strict'

const routes = require('./routes')
const handler = require('./handler')
const config = require('../../Config/app')
const services = require('./services/scraperFacadesCached')

exports.register = function (server, options, next) {

  services.registerFacadesCached(server)

  if (config.cacheEnabled) {
    server.handler('partners', () => handler.partnersCached(server))
    server.handler('allYours', () => handler.allYoursCached(server))
    server.handler('addresses', () => handler.addressesCached(server))
  } else {
    server.handler('partners', () => handler.partners)
    server.handler('allYours', () => handler.allYours)
    server.handler('addresses', () => handler.addresses)
  }

  routes.registerRoutes(server, options)
  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}
