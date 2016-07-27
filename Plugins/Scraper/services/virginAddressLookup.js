/**
 * Created by graemeross on 22/07/2016.
 */

"use strict";

const Wreck = require('wreck');
const VirginAddress = require('../models/virginAddress');
const fuzzySet = require('fuzzyset.js');
const scraperValidation = require('./scraperValidation');

exports.formatAddressLikeVirgin = function(address = {}) {
    const { addressLine1 = '', addressLine2 = '', city = '', postcode = '' } = address;
    let virginAddress = {};

    // addressLine2 has data - assume its street name, addressLine1 is house no
    // addressLine2 is empty - assume addressline1 has house no and street name
    if (addressLine2) {
        virginAddress = new VirginAddress({
            addressLine1: scraperValidation.validateAddress(`${addressLine1} ${addressLine2}`),
            city: scraperValidation.validateAddress(city),
            postcode: scraperValidation.validatePostcode(postcode)
        });
    } else {
        virginAddress = new VirginAddress({
            addressLine1: scraperValidation.validateAddress(addressLine1),
            city: scraperValidation.validateAddress(city),
            postcode: scraperValidation.validatePostcode(postcode)
        });
    }

    return virginAddress;
};

exports.postcodeLookup = function (postcode) {

    return new Promise(function(resolve, reject) {
        const url = `https://cablemystreet.virginmedia.com/cms/api/getCMSResponse?postcode=${postcode}`;

        Wreck.get(url, {json: true}, function (err, res, payload) {
            if (err || res.statusCode !== 200) {
                reject();
            }

            if (payload.address) {
                const virginAddresses = payload.address.map(address => new VirginAddress({
                    addressLine1: `${address.buildingNumber} ${address.street}`,
                    city: `${address.townOrCity}`,
                    postcode: `${address.postcode}`
                }));

                resolve(virginAddresses);
            } else {
                reject();
            }
        });
    });
};

const exactAddressMatch = function(address, virginAddress) {

    return address.addressLine1 === virginAddress.addressLine1 &&
           address.city === virginAddress.city &&
           address.postcode === virginAddress.postcode;
};

const fuzzyAddressMatch = function(address, virginAddress) {

    const fuzzyToleranceThresholdLower = 0.95;
    const fuzzyToleranceThresholdUpper = 1;
    const addressline1Fuzzy = fuzzySet([virginAddress.addressLine1]);
    const addressline1FuzzyResult = addressline1Fuzzy.get(address.addressLine1);
    const cityFuzzy = fuzzySet([virginAddress.city]);
    const cityFuzzyResult = cityFuzzy.get(address.city);
    const postcodeFuzzy = fuzzySet([virginAddress.postcode]);
    const postcodeFuzzyResult = postcodeFuzzy.get(address.postcode);

    const matchFound = addressline1FuzzyResult[0][0] >= fuzzyToleranceThresholdLower &&
                       cityFuzzyResult[0][0] >= fuzzyToleranceThresholdUpper &&
                       postcodeFuzzyResult[0][0] >= fuzzyToleranceThresholdUpper;

    return { matchFound,
             tolerance: addressline1FuzzyResult[0][0],
             address: virginAddress};
};

exports.matchAddressToVirginLookups = function(address, virginAddresses) {
    
    let match = {matchFound: false,
                 tolerance: 0 };

    for (let itr = 0; itr < virginAddresses.length; itr++) {

        // Exact Match
        if (exactAddressMatch(address, virginAddresses[itr])) {

            match = {matchFound: true,
                    tolerance: 1,
                    address};
            break;
        } else {
            // Fuzzy Match
            const fuzzyMatch = fuzzyAddressMatch(address, virginAddresses[itr]);

            if (fuzzyMatch.matchFound) {
                match = {matchFound: true,
                        tolerance: fuzzyMatch.tolerance,
                        address: fuzzyMatch.address};
                break;
            }
        }
    }

    return match;
};

const formatPostcodeLikeVirginString = function(postcode) {
    
    if (postcode.length === 5) {
        return `${postcode.slice(0, 2)} ${postcode.slice(2)}`;
    }

    if (postcode.length === 6) {
        return `${postcode.slice(0, 3)} ${postcode.slice(3)}`;
    }

    if (postcode.length === 7) {
        return `${postcode.slice(0, 4)} ${postcode.slice(4)}`;
    }

    return postcode;
};

exports.convertAddressToVirginString = function (address) {

    const formattedPostcode = formatPostcodeLikeVirginString(address.postcode);

    return {address: `${address.addressLine1}, ${address.city}, ${formattedPostcode}`,
            postcode: `${formattedPostcode}`};
};