/* eslint-env mocha */

'use strict'

const expect = require('chai').expect
const sinon = require('sinon')
const server = require('../testServer')
const scraperFacade = require('../../Plugins/CouncilTax/services/gov.uk.scraper')

describe('scrape gov.uk.scraper', () => {
  let sandbox = null

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should return council tax info', done => {
    sandbox.stub(scraperFacade, 'scrape', function () {
      return Promise.resolve({name: 'Newcastle Upon Tyne',
        type: 'county',
        website: 'www.newcastle.gov.uk'})
    })

    const options = {
      method: 'GET',
      url: '/api/findLocalCouncil/ne65ty',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

    server.inject(options, res => {
      expect(res.statusCode).to.equal(200)
      done()
    })
  })
})
