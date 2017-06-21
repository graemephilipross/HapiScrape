/**
 * Created by graemeross on 06/06/2017.
 */

'use strict'

const validation = require('./services/scraperValidation')

exports.registerRoutes = function (server, option) {
  server.route({
    method: 'GET',
    path: '/partners',
    handler: {
      partners: {}
    },
    config: {
      validate: {
        query: {
          postcode: validation.queryParamReq,
          addressLine1: validation.queryParamReq,
          addressLine2: validation.queryParam,
          city: validation.queryParamReq
        }
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/allyours',
    handler: {
      allYours: {}
    },
    config: {
      validate: {
        query: {
          postcode: validation.queryParamReq,
          addressLine1: validation.queryParamReq,
          addressLine2: validation.queryParam,
          city: validation.queryParamReq
        }
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/allyours/addresses',
    handler: {
      addresses: {}
    },
    config: {
      validate: {
        query: {
          postcode: validation.queryParamReq
        }
      }
    }
  })
}
