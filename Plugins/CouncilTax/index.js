/**
 * Created by graemeross on 21/11/2016.
 */

"use strict";

const routes = require('./routes');
const handler = require('./handler');

exports.register = function (server, options, next) {
    server.handler('findLocalCouncil', () => handler.findLocalCouncil);
    routes.registerRoutes(server, options);
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};