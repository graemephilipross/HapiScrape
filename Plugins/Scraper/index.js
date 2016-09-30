/**
 * Created by graemeross on 21/07/2016.
 */

"use strict";

const routes = require('./routes');
const handler = require('./handler');

exports.register = function (server, options, next) {
    server.handler('virginAvailability', () => handler.virginAvailability);
    server.handler('virginAvailabilityFormattedAddress', () => handler.virginAvailabilityFormattedAddress);
    server.handler('virginAvailabilityAllYours', () => handler.virginAvailabilityAllYours);
    server.handler('virginAvailabilityAllYoursFormattedAddress', () => handler.virginAvailabilityAllYoursFormattedAddress);
    server.handler('virginAddresses', () => handler.virginAddresses);
    server.handler('virginAddressesAllYours', () => handler.virginAddressesAllYours);
    routes.registerRoutes(server, options);
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};