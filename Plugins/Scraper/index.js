/**
 * Created by graemeross on 21/07/2016.
 */

"use strict";

const routes = require('./routes');
const handler = require('./handler');

exports.register = function (server, options, next) {
    server.handler('virginAvailability', () => handler.virginAvailability);
    server.handler('virginAvailabilityFormattedAddress', () => handler.virginAvailabilityFormattedAddress);
    routes.registerRoutes(server, options);
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};