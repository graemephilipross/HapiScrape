/**
 * Created by graemeross on 21/11/2016.
 */

"use strict";

const govUKScraper = require('./services/gov.uk.scraper');

exports.findLocalCouncil = function (request, reply) {

    const postcode = request.params.postcode;

    govUKScraper.scrape(postcode).then(data => reply({data}).code(200))
                                .catch(error => reply({error}).code(500));
};