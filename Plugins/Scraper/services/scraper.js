/**
 * Created by graemeross on 21/07/2016.
 */

"use strict";

const Horseman = require('node-horseman');

module.exports = function(postcode, address) {

    // new instance per request
    const horseman = new Horseman({loadImages: false});

    return new Promise(function (resolve, reject) {

        let isVirginAvailable = false;

        horseman
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .open('https://www.virginmediapartners.com/oub')
            .open('https://www.virginmediapartners.com/postcode')
            .waitForNextPage()
            .cookies()
            .type('#PostcodePostcode', postcode)
            .click('.postcode-trigger')
            .waitFor(function(validSelector, invalidSelector){
                return $(validSelector).length > 0 || $(invalidSelector).length > 0;
            }, '#address', '#cboxLoadedContent > p', true)
            .evaluate(function(validSelector) {
                return { isSuccess: $(validSelector).length > 0 };
            }, '#address').then(ctx => {
                if (!ctx.isSuccess) {
                    return horseman.close().then(_ => reject(isVirginAvailable));
                } })
            .select('#address', address)
            .waitFor(function(selector){
                return $(selector).is(':disabled');
            }, '#postcode-checker-btn', false)
            .click('#postcode-checker-btn')
            .waitForNextPage()
            .waitForSelector('#cboxLoadedContent > p')
            .text('#cboxLoadedContent > p').then(text => {
                isVirginAvailable = text.toLowerCase().indexOf('is in a virgin media area') > -1;
                return horseman.close().then(_ => resolve(isVirginAvailable));
            })
            .catch(error => {
                return horseman.close().then(_ => reject(isVirginAvailable));
            });

    });
};