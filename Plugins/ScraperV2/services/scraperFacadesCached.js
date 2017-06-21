/**
 * Created by graemeross on 21/07/2017.
 */

'use strict'

const scraperFacades = require('./scraperFacades')
const config = require('../../../Config/app')

const internals = {}

internals.handler = {
  apply (target, ctx, args) {
        // get second next callback param
    const [, next] = args
    return target(...args)
      .then(results => next(null, results))
      .catch(err => next(err))
  }
}

internals.handlerAllYours = {
  apply (target, ctx, args) {
        // get second next callback param
    const [, next] = args
    return target(...args)
      .then(results => next(null, results))
      .catch(err => {
        if (err.isVirginAvailable === false) {
          return next(null, err)
        }
        next(err)
      })
  }
}

internals.handlerAddresses = {
  apply (target, ctx, args) {
        // get second next callback param
    const [, next] = args
    return target(...args)
      .then(results => next(null, results))
      .catch(err => {
        if (err.addresses) {
          return next(null, err)
        }
        next(err)
      })
  }
}

internals.cache = {
  cache: 'redisCache',
  expiresIn: config.cacheExpiration,
  generateTimeout: config.scraperTimeout * 2
}

internals.generateKey = addressObj => {
  return Object.keys(addressObj).map(v => addressObj[v]).join(',')
}

exports.registerFacadesCached = server => {
  const proxyPartners = new Proxy(scraperFacades.partners, internals.handler)
  const proxyAllYours = new Proxy(scraperFacades.allYours, internals.handlerAllYours)
  const proxyAddresses = new Proxy(scraperFacades.addresses, internals.handlerAddresses)

  server.method('partnersCached', proxyPartners, {
    cache: internals.cache,
    generateKey: internals.generateKey
  })

  server.method('allYoursCached', proxyAllYours, {
    cache: internals.cache,
    generateKey: internals.generateKey
  })

  server.method('addressesCached', proxyAddresses, {
    cache: internals.cache,
    generateKey: internals.generateKey
  })
}
