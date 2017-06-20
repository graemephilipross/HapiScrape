/**
 * Created by graemeross on 21/07/2016.
 */

'use strict'

const scraperFacade = require('./services/scraperFacades')

exports.partners = function (request, reply) {
  const postcode = request.query.postcode
  const addressLine1 = request.query.addressLine1
  const addressLine2 = request.query.addressLine2
  const city = request.query.city

  const address = {addressLine1,
    addressLine2,
    city,
    postcode}

  scraperFacade.partners(address)
  .then(result => {
    return reply({virginAvailable: result}).code(200)
  })
  .catch(err => {
    return reply({virginAvailable: false}).code(200)
  })
}

exports.allYours = function (request, reply) {
  const postcode = request.query.postcode
  const addressLine1 = request.query.addressLine1
  const addressLine2 = request.query.addressLine2
  const city = request.query.city

  const address = {addressLine1,
    addressLine2,
    city,
    postcode}

  scraperFacade.allYours(address)
  .then(result => {
    return reply(result).code(200)
  })
  .catch(err => {
    if (err.isVirginAvailable === false) {
       return reply(err).code(200)
    }
    return reply(
      err.message || 
      `Something went wrong`
    ).code(500)
  })
}

exports.addresses = function (request, reply) {
  const postcode = request.query.postcode
  const address = {postcode}

  scraperFacade.addresses(address)
  .then(result => {
    return reply(result).code(200)
  })
  .catch(err => {
    if (err.addresses) {
       return reply(err).code(200)
    }
    return reply(
      err.message || 
      `Something went wrong`
    ).code(500)
  })
}
