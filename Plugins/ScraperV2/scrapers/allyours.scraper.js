/**
 * Created by graemeross on 21/07/2016.
 */

'use strict'

const Horseman = require('node-horseman')
const config = require('../../../Config/app')

module.exports.scrape = function (postcode, address) {
    // new instance per request
  const horseman = new Horseman({
    loadImages: false,
    timeout: config.scraperTimeout
  })

  return new Promise(function (resolve, reject) {
    let isVirginAvailable = false

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
      .evaluate(function (address) {
          // es6 syntax doesnt work inside horseman functions
        var matchIndex = []

        $('select[name="chosenAddress"] option').each(function (index, el) {
          if ($(el).text() === address) {
            matchIndex.push(index)
          }
        })

        if (matchIndex.length > 0) {
          return matchIndex
        }

        throw new Error('unable to find address')
      }, address).then(function (result) {
          // horseman select indexs from 1
        var selectValue = result[0]
        return horseman.select('select[name="chosenAddress"]', selectValue)
                .waitFor(function (selector, selectedIndex) {
                  return $(selector).val() === selectedIndex.toString()
                }, 'select[name="chosenAddress"]', selectValue, true)
                .click('input[name="next"]')
                .waitForNextPage()
                .waitForSelector('.datagrid')
                .evaluate(function () {
                    // es6 syntax doesnt work inside horseman functions
                  var virginData = {}
                  var rows = $('.datagrid > table > tbody > tr')

                  rows.each(function (index, row) {
                        // Site ID
                    if ($(row).find('td:first-child').text().toUpperCase().indexOf('SITE ID') > -1) {
                      virginData.siteID = $(row).find('td:nth-child(2)').text()
                    }

                        // Quick Start BB/DTV Eligibility
                    if ($(row).find('td:first-child').text().toUpperCase().indexOf('QUICK START BB/DTV ELIGIBILITY') > -1) {
                      virginData.quickStartBBDTVEligibility = $(row).find('td:nth-child(2)').text().toUpperCase().indexOf('YES') > -1
                    }

                        // Quick Start Telephony Eligibility
                    if ($(row).find('td:first-child').text().toUpperCase().indexOf('QUICK START TELEPHONY ELIGIBILITY') > -1) {
                      virginData.quickStartTelephonyEligibility = $(row).find('td:nth-child(2)').text().toUpperCase().indexOf('YES') > -1
                    }

                        // Address Active
                    if ($(row).find('td:first-child').text().toUpperCase().indexOf('ADDRESS ACTIVE') > -1) {
                      virginData.addressActive = $(row).find('td:nth-child(2)').text().toUpperCase().indexOf('YES') > -1
                    }

                        // Crew Size required
                    if ($(row).find('td:first-child').text().toUpperCase().indexOf('CREW SIZE REQUIRED') > -1) {
                      virginData.crewSizeRequired = $(row).find('td:nth-child(2)').text()
                    }

                        // Wayleave required
                    if ($(row).find('td:first-child').text().toUpperCase().indexOf('WAYLEAVE REQUIRED') > -1) {
                      virginData.wayleaveRequired = $(row).find('td:nth-child(2)').text().toUpperCase().indexOf('YES') > -1
                    }
                  })

                  var premiseInfo = {}

                    // Site ID
                  if (virginData.siteID) {
                    premiseInfo.SiteID = virginData.siteID
                  }

                    // Install Type & Estimate
                  if (virginData.quickStartBBDTVEligibility) {
                    premiseInfo.InstallEstimate = '2 - 3 Days'
                    premiseInfo.InstallType = 'Quick Start'
                  } else if (virginData.crewSizeRequired) {
                    if (virginData.crewSizeRequired > 1) {
                      premiseInfo.InstallEstimate = '2 - 4 Weeks'
                      premiseInfo.InstallType = virginData.crewSizeRequired + ' man install'
                    } else {
                      premiseInfo.InstallEstimate = '7 - 10 Days'
                      premiseInfo.InstallType = '1 man install'
                    }
                  } else {
                    premiseInfo.InstallEstimate = 'Unknown'
                    premiseInfo.InstallType = 'Unknown'
                  }

                    // Property Status
                  if (virginData.addressActive) {
                    premiseInfo.PropertyStatus = 'Gone Away'
                  } else if (virginData.wayleaveRequired) {
                    premiseInfo.PropertyStatus = 'Wayleave'
                  } else {
                    premiseInfo.PropertyStatus = 'None'
                  }

                  return premiseInfo
                }).then(function (result) {
                  isVirginAvailable = true
                  return horseman.close().then(_ => resolve({isVirginAvailable,
                    virginData: result}))
                })
      })
      .catch(error => horseman.close().then(_ => reject({isVirginAvailable,
        virginData: {}})))
  })
}
