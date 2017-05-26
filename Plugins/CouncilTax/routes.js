/**
 * Created by graemeross on 21/07/2016.
 */

'use strict'

const scraperValidation = require('./services/councilTaxValidation')

exports.registerRoutes = function (server, option) {
  server.route({
    method: 'GET',
    path: '/findLocalCouncil/{postcode}',
    handler: {
      findLocalCouncil: {}
    },
    config: {
      validate: {
        params: {
          postcode: scraperValidation.CheckQueryParamRequired
        }
      }
    }
  })
}
