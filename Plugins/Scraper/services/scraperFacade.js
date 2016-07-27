
"use strict";

const virginAddressLookup = require('./virginAddressLookup');
const scraper = require('./scraper');

exports.isVirginAvailable = function (address = {}) {
    const formattedAddress = virginAddressLookup.formatAddressLikeVirgin(address);
    const scrapeTask =
    
        virginAddressLookup.postcodeLookup(formattedAddress.postcode)
            .then(virginAddresses => {
                const result = virginAddressLookup.matchAddressToVirginLookups(formattedAddress, virginAddresses);

                if (result.matchFound) {
                    return virginAddressLookup.convertAddressToVirginString(result.address);
                }
                // reject list of formatted virgin string addresses
                return Promise.reject({result,
                    virginAddresses: virginAddresses.map(address => virginAddressLookup.convertAddressToVirginString(address))});
            })
            .then(resultString => scraper.scrape(resultString.postcode, resultString.address),
                  potentialMatchedAddresses => Promise.reject(potentialMatchedAddresses))
            .catch(err => Promise.reject(err));
    
    return scrapeTask;
};

exports.runScraper = function (virginPostcode, virginAddressString) {
    return scraper.scrape(virginPostcode, virginAddressString);
};