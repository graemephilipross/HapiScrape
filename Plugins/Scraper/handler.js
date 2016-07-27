/**
 * Created by graemeross on 21/07/2016.
 */

"use strict";

const scraperFacade = require('./services/scraperFacade');

exports.virginAvailability = function (request, reply) {

    const postcode = request.query.postcode;
    const addressLine1 = request.query.addressLine1;
    const addressLine2 = request.query.addressLine2;
    const city = request.query.city;

    const address = {addressLine1,
                     addressLine2,
                     city,
                     postcode};

    scraperFacade.isVirginAvailable(address)
           .then(result => reply({isVirginAvailable: result}).code(200))
           .catch(result => reply({isVirginAvailable: false,
                                   data: result}).code(200));
};

exports.virginAvailabilityFormattedAddress = function (request, reply) {
    
    const postcode = request.query.postcode;
    const address = request.query.address;

    scraperFacade.runScraper(postcode, address)
           .then(result => reply({isVirginAvailable: result}).code(200))
           .catch(result => reply({isVirginAvailable: result}).code(200));
};