'use strict';

const sinon = require('sinon');
const server = require('../testServer');
const scraperFacade = require('../../Plugins/Scraper/services/scraperFacade');

describe('example desc', () => {

    let sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('example test', done => {
        
        sandbox.stub(scraperFacade, 'isVirginAvailable', function() { return Promise.resolve(true); });

        const options = {
            method: 'GET',
            url: '/api/virginAvailability?postcode=NE359HD&addressLine1=test&addressLine2=test&city=newcastle',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        };

        server.inject(options, res => {
            console.log(res.statusCode);
            console.log(res.payload);
            done();
        });
    });
});