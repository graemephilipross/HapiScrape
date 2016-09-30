
"use strict";

const virginAddressLookup = require('./virginAddressLookup');

exports.virginAddresses = postcode => virginAddressLookup.postcodeLookup(postcode);

exports.virginAddressesAllYours = postcode =>
    virginAddressLookup.postcodeLookupAllYours(postcode)
        .then(addresses => addresses)
        .catch(() =>
            // addresses is [] so call cablemystreet postcodeLookup
            exports.virginAddresses(postcode)
                .then(addresses => addresses)
        );
