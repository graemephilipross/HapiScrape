/**
 * Created by graemeross on 21/11/2016.
 */

"use strict";

const Wreck = require('wreck');

exports.scrape = function (postcode) {

    const getData = new Promise(function(resolve, reject) {
        const url = `https://www.gov.uk/find-local-council/`;

        const payload = {
            postcode
        };

        const options = {
            payload: JSON.stringify(payload),
            redirects: 2
        };

        Wreck.post(url, options, (err, res, payload) => {
            Wreck.read(res, null, (error, body) => {
                console.log(body.toString());
            });
            
            if (err) {
                return reject(err);
            }
            if (res.statusCode !== 302) {
                return reject(res);
            }
            return resolve(payload.toString());
        });
    });

    return getData.then(data => {
        console.log(data);
        return data;
    }).catch(err => {
        console.log(err);
        return err;
    });
};