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

    let sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });
    
    it('should return isVirginAvailable true', function(done) {

        sandbox.stub(virginAddressLookup, 'formatAddressLikeVirgin', function() {
            return {addressLine1: "203 ADDYCOMBE TERRACE",
                    city: "NEWCASTLE UPON TYNE",
                    postcode: "NE65TY"};
        });

        sandbox.stub(virginAddressLookup, 'postcodeLookup', function () {
            return Promise.resolve([{
                addressLine1: "203 ADDYCOMBE TERRACE",
                city: "NEWCASTLE UPON TYNE",
                postcode: "NE65TY"
            }]);
        });

        sandbox.stub(virginAddressLookup, 'matchAddressToVirginLookups', function () {
            return {matchFound: true,
                    tolerance: 1,
                    address: {
                        addressLine1: "203 ADDYCOMBE TERRACE",
                        city: "NEWCASTLE UPON TYNE",
                        postcode: "NE65TY"
                    }};
        });

        sandbox.stub(virginAddressLookup, 'convertAddressToVirginString', function () {
            return {address: "203 ADDYCOMBE TERRACE, NEWCASTLE UPON TYNE, NE6 5TY",
                    postcode: "NE6 5TY"};
        });

        sandbox.stub(scraper, 'scrape', function () {
            return Promise.resolve(true);
        });

        scraperFacade.isVirginAvailable(mockPayload)
            .then(function(result) {
                expect(result).to.equal(true);
                done();
            });
    });

    it('should return isVirginAvailable false - unable to format address', function(done) {
        sandbox.stub(virginAddressLookup, 'formatAddressLikeVirgin', function() {
            return {addressLine1: "",
                    city: "",
                    postcode: ""};
        });
        
        scraperFacade.isVirginAvailable(mockPayload)
            .catch(function(result) {
                expect(result.virginAddresses).to.have.lengthOf(0);
                done();
            });

    });

    it('should return isVirginAvailable false - invalid postcode', function(done) {

        sandbox.stub(virginAddressLookup, 'formatAddressLikeVirgin', function() {
            return {addressLine1: "203 ADDYCOMBE TERRACE",
                city: "NEWCASTLE UPON TYNE",
                postcode: "NE1111"};
        });

        scraperFacade.isVirginAvailable(mockPayload)
            .catch(function(result) {
                expect(result.virginAddresses).to.have.lengthOf(0);
                done();
            });

    });

    it('should return isVirginAvailable false - invalid postcode', function(done) {

        sandbox.stub(virginAddressLookup, 'formatAddressLikeVirgin', function() {
            return {addressLine1: "8 BROCKHAMPTON CLOSE",
                city: "BOLDON",
                postcode: "NE359HD"};
        });

        scraperFacade.isVirginAvailable(mockPayload)
            .catch(function(result) {
                expect(result.virginAddresses).to.not.be.empty;
                done();
            });

    });

    it('should return isVirginAvailable false - undefined inputs throw error', function(done) {

        sandbox.stub(virginAddressLookup, 'formatAddressLikeVirgin', function() {
            return {addressLine1: undefined,
                city: undefined,
                postcode: undefined};
        });

        scraperFacade.isVirginAvailable(mockPayload)
            .catch(function(result) {
                expect(result.data).to.be.undefined;
                done();
            });

    });

});




