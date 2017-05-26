/**
 * Created by graemeross on 29/09/2016.
 */

'use strict'

const Horseman = require('node-horseman')
const config = require('../../../Config/app')

module.exports.scrapePostcodes = function (postcode) {
    // new instance per request
  const horseman = new Horseman({
    loadImages: false,
    timeout: config.scraperTimeout
  })

  return new Promise(function (resolve, reject) {
    horseman
            .userAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36')
            .cookies([])
            .open('https://allyours.virginmedia.com/retailerstore')
            .cookies()
            .type('input[name="postcode"]', postcode)
            .click('input[name="next"]')
            .waitForNextPage()
            .exists('select[name="chosenAddress"]').then(function (result) {
              if (!result) {
                throw new Error('invalid postcode')
              }
              return true
            })
            .evaluate(function () {
                // es6 syntax doesnt work inside horseman functions
              const addresses = []

              $('select[name="chosenAddress"] option').each(function (index, el) {
                addresses.push($(el).text())
              })

              if (addresses.length > 0) {
                return addresses
              }

              throw new Error('no addresses found')
            })
            .then(function (addresses) {
              return horseman.close().then(_ => resolve({addresses}))
            })
            .catch(function (error) {
              return horseman.close().then(_ => reject({addresses: []}))
            })
  })
}
