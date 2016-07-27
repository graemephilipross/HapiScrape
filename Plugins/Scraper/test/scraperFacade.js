/* eslint-env mocha */

const expect = require('chai').expect;
const sinon = require('sinon');
const scraperFacade = require('../services/scraperFacade');
const virginAddressLookup = require('../services/virginAddressLookup');
const scraper = require('../services/scraper');

const mockPayload = {addressLine1: "203 Addycombe Terrace",
                     addressLine2: "",
                     city: "newcastle upon tyne",
                     postcode: "ne65ty"};

describe('isVirginAvailable', function () {
    
    it('should return isVirginAvailable true', function(done) {

        sinon.stub(virginAddressLookup, 'formatAddressLikeVirgin', function() {
            return {addressLine1: "203 ADDYCOMBE TERRACE",
                    city: "NEWCASTLE UPON TYNE",
                    postcode: "NE65TY"};
        });

        sinon.stub(virginAddressLookup, 'postcodeLookup', function () {
            return Promise.resolve([{
                addressLine1: "203 ADDYCOMBE TERRACE",
                city: "NEWCASTLE UPON TYNE",
                postcode: "NE65TY"
            }]);
        });

        sinon.stub(virginAddressLookup, 'matchAddressToVirginLookups', function () {
            return {matchFound: true,
                    tolerance: 1,
                    address: {
                        addressLine1: "203 ADDYCOMBE TERRACE",
                        city: "NEWCASTLE UPON TYNE",
                        postcode: "NE65TY"
                    }};
        });

        sinon.stub(virginAddressLookup, 'convertAddressToVirginString', function () {
            return {address: "203 ADDYCOMBE TERRACE, NEWCASTLE UPON TYNE, NE6 5TY",
                    postcode: "NE6 5TY"};
        });

        sinon.stub(scraper, 'scrape', function () {
            return Promise.resolve(true);
        });

        scraperFacade.isVirginAvailable(mockPayload)
            .then(function(result) {
                expect(result).to.equal(true);
                done();
            });
    });
});




