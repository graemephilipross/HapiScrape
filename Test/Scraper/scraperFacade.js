/* eslint-env mocha */

'use-strict'

const expect = require('chai').expect
const sinon = require('sinon')
const scraperFacade = require('../../Plugins/Scraper/services/scraperFacade')
const virginAddressLookup = require('../../Plugins/Scraper/services/virginAddressLookup')
const scraper = require('../../Plugins/Scraper/services/scraper')
const scraperAllYours = require('../../Plugins/Scraper/services/allyours.virginMediaScraper')

const mockPayload = {addressLine1: '203 Addycombe Terrace',
  addressLine2: '',
  city: 'newcastle upon tyne',
  postcode: 'ne65ty'}

describe('isVirginAvailable', function () {
  let sandbox = null

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should return isVirginAvailable true', function (done) {
    sandbox.stub(virginAddressLookup, 'formatAddressLikeVirgin', function () {
      return {addressLine1: '203 ADDYCOMBE TERRACE',
        city: 'NEWCASTLE UPON TYNE',
        postcode: 'NE65TY'}
    })

    sandbox.stub(virginAddressLookup, 'postcodeLookupAllYours', function () {
      return Promise.resolve([{
        addressLine1: '203 ADDYCOMBE TERRACE',
        city: 'NEWCASTLE UPON TYNE',
        postcode: 'NE65TY'
      }])
    })

    sandbox.stub(virginAddressLookup, 'matchAddressToVirginLookups', function () {
      return {matchFound: true,
        tolerance: 1,
        address: {
          addressLine1: '203 ADDYCOMBE TERRACE',
          city: 'NEWCASTLE UPON TYNE',
          postcode: 'NE65TY'
        }}
    })

    sandbox.stub(virginAddressLookup, 'convertAddressToVirginString', function () {
      return {address: '203 ADDYCOMBE TERRACE, NEWCASTLE UPON TYNE, NE6 5TY',
        postcode: 'NE6 5TY'}
    })

    sandbox.stub(scraper, 'scrape', function () {
      return Promise.resolve(true)
    })

    scraperFacade.isVirginAvailable(mockPayload)
            .then(function (result) {
              expect(result).to.equal(true)
              done()
            })
  })
})

// allyours.virginmedia.com/retailerstore

describe('isVirginAvailable scrape at allyours.virginmedia.com/retailerstore', function () {
  let sandbox = null

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should return isVirginAvailable true', function (done) {
    sandbox.stub(virginAddressLookup, 'formatAddressLikeVirgin', function () {
      return {addressLine1: '203 ADDYCOMBE TERRACE',
        city: 'NEWCASTLE UPON TYNE',
        postcode: 'NE65TY'}
    })

    sandbox.stub(virginAddressLookup, 'postcodeLookupAllYours', function () {
      return Promise.resolve([{
        addressLine1: '203 ADDYCOMBE TERRACE',
        city: 'NEWCASTLE UPON TYNE',
        postcode: 'NE65TY'
      }])
    })

    sandbox.stub(virginAddressLookup, 'matchAddressToVirginLookups', function () {
      return {matchFound: true,
        tolerance: 1,
        address: {
          addressLine1: '203 ADDYCOMBE TERRACE',
          city: 'NEWCASTLE UPON TYNE',
          postcode: 'NE65TY'
        }}
    })

    sandbox.stub(virginAddressLookup, 'convertAddressToVirginString', function () {
      return {address: '203 ADDYCOMBE TERRACE, NEWCASTLE UPON TYNE, NE6 5TY',
        postcode: 'NE6 5TY'}
    })

    sandbox.stub(scraperAllYours, 'scrape', function () {
      return Promise.resolve({isVirginAvailable: true})
    })

    scraperFacade.isVirginAvailableAllYours(mockPayload)
            .then(function (result) {
              expect(result.isVirginAvailable).to.equal(true)
              done()
            })
  })
})
