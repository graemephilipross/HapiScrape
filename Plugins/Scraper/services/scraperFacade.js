
"use strict";

const virginAddressLookup = require('./virginAddressLookup');
const scraper = require('./scraper');

exports.isVirginAvailable = function (address = {}) {

    return new Promise(function(resolve, reject) {
        const formattedAddress = virginAddressLookup.formatAddressLikeVirgin(address);
    
        virginAddressLookup.postcodeLookup(formattedAddress.postcode)
        .then(virginAddresses => {
            const result = virginAddressLookup.matchAddressToVirginLookups(formattedAddress, virginAddresses);

            if (result.matchFound) {
                return virginAddressLookup.convertAddressToVirginString(result.address);
            }
                
            return reject(result);
        })
        .then(resultString => {
            scraper(resultString.postcode, resultString.address)
            .then(result => resolve(result));
        })
        .catch(err => reject(err));
    });
};

exports.runScraper = function (virginPostcode, virginAddressString) {
    
    return new Promise(function(resolve, reject) {
        scraper(virginPostcode, virginAddressString)
        .then(result => resolve(result))
        .catch(result => reject(result));
    });
};