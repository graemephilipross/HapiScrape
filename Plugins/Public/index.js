'use strict';

const routes = [{
    method: 'GET',
    path: '/{filename*}',
    config: {
        auth: false
    },
    handler: {
        directory: {
            path: `${__dirname}/../../Public`,
            listing: true,
            index: true
        }
    }
}];

exports.register = (server, options, next) => {
    server.route(routes);

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
