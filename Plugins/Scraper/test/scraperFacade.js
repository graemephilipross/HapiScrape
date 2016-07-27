/* eslint-env mocha */

const expect = require('chai').expect;
const sinon = require('sinon');
const scraperFacade = require('../services/scraperFacade');
const virginAddressLookup = require('../services/virginAddressLookup');

const mockPayload = {addressLine1: "203 Addycombe Terrace",
                     addressLine2: "",
                     city: "newcastle upon tyne",
                     postcode: "ne65ty"};

/*describe('isVirginAvailable', function () {
    this.timeout(10000);
    it('should return isVirginAvailable true', function(done) {
        scraperFacade.isVirginAvailable(mockPayload)
            .then(function(result) {
                expect(result).to.equal(true);
                done();
            });
    });
});*/

describe('isVirginAvailable', function () {
    let virginAddressLookupSpy;
    beforeEach(function () {
        virginAddressLookupSpy = sinon.spy(virginAddressLookup, 'formatAddressLikeVirgin');
    });
    afterEach(function () {
        virginAddressLookupSpy.reset();
    });
    it('should return isVirginAvailable true', function(done) {
        this.timeout(10000);
        scraperFacade.isVirginAvailable(mockPayload)
            .then(function(result) {
                sinon.assert(virginAddressLookupSpy.calledOnce);
                done();
            });
    });
});




