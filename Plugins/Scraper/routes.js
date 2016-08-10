/**
 * Created by graemeross on 21/07/2016.
 */

'use strict';

const scraperValidation = require('./services/scraperValidation');

exports.registerRoutes = function(server, option) {

    server.route({
        method: 'GET',
        path: '/virginAvailability',
        handler: {
            virginAvailability: {}
        },
        config: {
            validate: {
                query: {
                    postcode: scraperValidation.CheckQueryParamRequired,
                    addressLine1: scraperValidation.CheckQueryParamRequired,
                    addressLine2: scraperValidation.CheckQueryParam,
                    city: scraperValidation.CheckQueryParamRequired
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/virginAvailabilityFormattedAddress',
        handler: {
            virginAvailabilityFormattedAddress: {}
        },
        config: {
            validate: {
                query: {
                    postcode: scraperValidation.CheckQueryParamRequired,
                    address: scraperValidation.CheckQueryParamRequired
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/virginAvailabilityAllYours',
        handler: {
            virginAvailabilityAllYours: {}
        },
        config: {
            validate: {
                query: {
                    postcode: scraperValidation.CheckQueryParamRequired,
                    addressLine1: scraperValidation.CheckQueryParamRequired,
                    addressLine2: scraperValidation.CheckQueryParam,
                    city: scraperValidation.CheckQueryParamRequired
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/virginAvailabilityAllYoursFormattedAddress',
        handler: {
            virginAvailabilityAllYoursFormattedAddress: {}
        },
        config: {
            validate: {
                query: {
                    postcode: scraperValidation.CheckQueryParamRequired,
                    address: scraperValidation.CheckQueryParamRequired
                }
            }
        }
    });

};