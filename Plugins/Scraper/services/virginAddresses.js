
"use strict";

const virginAddressLookup = require('./virginAddressLookup');

exports.virginAddresses = postcode => virginAddressLookup.postcodeLookup(postcode);

exports.virginAddressesAllYours = postcode => virginAddressLookup.postcodeLookupAllYours(postcode);
