/**
 * Created by graemeross on 21/11/2016.
 */

'use strict'

const Horseman = require('node-horseman')

exports.scrape = function (postcode) {
     // new instance per request
  const horseman = new Horseman({loadImages: false})

  return new Promise(function (resolve, reject) {
    horseman
            .userAgent('Mozilla/5.0 (Windows NT x.y; rv:10.0) Gecko/20100101 Firefox/10.0')
            .open('https://www.gov.uk/find-local-council')
            .type('input[name="postcode"]', postcode)
            .click('button[type="submit"]')
            .waitForNextPage()
            .exists('[data-track-action="postcodeErrorShown:invalidPostcodeFormat"]').then(function (result) {
              if (result) {
                throw new Error('invalid postcode')
              }
              return true
            })
            .evaluate(function () {
                // es6 syntax doesnt work inside horseman functions

              const councilInfo = {}

              if ($('.district-result').length) {
                councilInfo.name = $('.district-result > p:first').text()
                councilInfo.website = $('.district-result a').text()
                councilInfo.type = 'district'
              } else {
                councilInfo.name = $('.unitary-result > p:first').text()
                councilInfo.website = $('.unitary-result a').text()
                councilInfo.type = 'county'
              }

              return councilInfo
            })
            .then(function (councilTaxInfo) {
              return horseman.close().then(_ => resolve({councilTaxInfo}))
            })
            .catch(function (error) {
              return horseman.close().then(_ => reject({councilTaxInfo: {}}))
            })
  })
}
