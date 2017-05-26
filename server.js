"use strict";

const Glue = require('glue');
const manifest = require('./Config/glue.manifest');
const options = {
    relativeTo: __dirname + '/Plugins'
};

module.exports = callback => {
    Glue.compose(manifest, options, function (err, server) {
        server.start(function (err) {

            // API running on port 3000

            if (err) {
                throw err;
            }
            
            console.log('Server running at:', server.info.uri);

            if (callback) {
                callback(server);
            }
        });
    });
};