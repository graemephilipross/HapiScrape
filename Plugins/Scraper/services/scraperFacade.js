
'use strict'

const virginAddressLookup = require('./virginAddressLookup')
const scraper = require('../scrapers/scraper')
const scraperAllYours = require('../scrapers/allyours.virginMediaScraper')
const virginAddresses = require('./virginAddresses')

const virginAdderssFormatAndLookup = function (address) {
  const formattedAddress = virginAddressLookup.formatAddressLikeVirgin(address)

  return virginAddresses.virginAddressesAllYours(formattedAddress.postcode)
  .then(virginAddresses => {
    const result = virginAddressLookup.matchAddressToVirginLookups(formattedAddress, virginAddresses)

    if (result.matchFound) {
      return virginAddressLookup.convertAddressToVirginString(result.address)
    }
      // reject list of formatted virgin string addresses
    return Promise.reject({result,
      virginAddresses: virginAddresses.map(address => virginAddressLookup.convertAddressToVirginString(address))})
  })
}

exports.isVirginAvailable = function (address = {}) {
  return virginAdderssFormatAndLookup(address)
  .then(resultString => scraper.scrape(resultString.postcode, resultString.address),
    potentialMatchedAddresses => Promise.reject(potentialMatchedAddresses ||
      { result: {},
        virginAddresses: []
      })
    )
}

exports.isVirginAvailableAllYours = function (address = {}) {
  return virginAdderssFormatAndLookup(address)
  .then(resultString => scraperAllYours.scrape(resultString.postcode, resultString.address),
    potentialMatchedAddresses => Promise.reject(potentialMatchedAddresses ||
      { result: {},
        virginAddresses: []
      })
    )
}

exports.runScraper = function (virginPostcode, virginAddressString) {
  return scraper.scrape(virginPostcode, virginAddressString)
}

exports.runScraperAllYours = function (virginPostcode, virginAddressString) {
  return scraperAllYours.scrape(virginPostcode, virginAddressString)
}
