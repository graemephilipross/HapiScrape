
'use strict'

const services = require('./virginServices')
const partners = require('../scrapers/partners.scraper')
const allYours = require('../scrapers/allyours.scraper')
const addresses = require('../scrapers/addresses.scraper')

const virginAddrPattern = function (address) {
  const formattedAddress = services.formatAddress(address)
  return Promise.resolve(services.createVirginAddress(formattedAddress))
}

exports.partners = function (address = {}) {
  return virginAddrPattern(address)
  .then(res => {
    return partners.scrape(res.postcode, res.address)
  })
}

exports.allYours = function (address = {}) {
  return virginAddrPattern(address)
  .then(res => {
    return allYours.scrape(res.postcode, res.address)
  })
}

exports.addresses = function (address = {}) {
  return virginAddrPattern(address)
  .then(res => {
    return addresses.scrape(res.postcode)
  })
  .then(res => {
    return services.addressObjsFromScrape(res)
  })
}
