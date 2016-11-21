/* eslint-env mocha */

const expect = require('chai').expect;
const sinon = require('sinon');
const scraperFacade = require('../services/gov.uk.scraper');

const mockPayload = {postcode: "ne65ty"};

describe('scrape gov.uk.scraper', function () {

    let sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });
    
    it('should return councilTaxInfo', function(done) {
    
        sandbox.stub(scraperFacade, 'scrape', function() {
            return {name: "Newcastle Upon Tyne",
                    type: "county",
                    website: "www.newcastle.gov.uk"};
        });

        scraperFacade.scrape(mockPayload)
            .then(function(result) {
                expect(result).to.not.be.empty;
                done();
            });
    });

});