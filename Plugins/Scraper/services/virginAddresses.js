
"use strict";

const virginAddressLookup = require('./virginAddressLookup');

exports.virginAddresses = postcode => virginAddressLookup.postcodeLookup(postcode);