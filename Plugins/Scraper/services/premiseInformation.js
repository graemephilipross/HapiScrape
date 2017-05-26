/**
 * Created by graemeross on 22/07/2016.
 */

'use strict'

module.exports = function (virginScraperData) {
  const premiseInfo = {}

    // Install Type & Estimate
  if (virginScraperData.quickStartBBDTVEligibility) {
    premiseInfo.InstallEstimate = '2 - 3 Days'
    premiseInfo.InstallType = 'Quick Start'
  } else if (virginScraperData.crewSizeRequired) {
    if (virginScraperData.crewSizeRequired > 1) {
      premiseInfo.InstallEstimate = '2 - 4 Weeks'
      premiseInfo.InstallType = `${virginScraperData.crewSizeRequired} man install`
    } else {
      premiseInfo.InstallEstimate = '7 - 10 Days'
      premiseInfo.InstallType = '1 man install'
    }
  } else {
    premiseInfo.InstallEstimate = 'Unknown'
    premiseInfo.InstallType = 'Unknown'
  }

    // Property Status
  if (virginScraperData.addressActive) {
    premiseInfo.PropertyStatus = 'Gone Away'
  } else if (virginScraperData.wayleaveRequired) {
    premiseInfo.PropertyStatus = 'Wayleave'
  } else {
    premiseInfo.PropertyStatus = 'None'
  }

  return premiseInfo
}
